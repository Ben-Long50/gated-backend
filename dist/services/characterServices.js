import prisma from '../config/database.js';
const characterServices = {
    getCharacters: async (userId) => {
        try {
            const characters = await prisma.character.findMany({
                where: {
                    userId,
                },
                include: {
                    perks: true,
                },
                orderBy: [{ active: 'desc' }, { level: 'desc' }],
            });
            if (characters.length === 0) {
                throw new Error('You have not created any characters');
            }
            return characters;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch characters');
        }
    },
    getActiveCharacter: async (userId) => {
        try {
            const activeCharacter = await prisma.character.findFirst({
                where: {
                    userId,
                    active: true,
                },
                include: {
                    perks: true,
                    characterCart: {
                        include: {
                            weapons: true,
                            armor: true,
                            cybernetics: true,
                            vehicles: true,
                        },
                    },
                    characterInventory: {
                        include: {
                            weapons: true,
                            armor: true,
                            cybernetics: {
                                include: { weapons: true, armor: true, actions: true },
                            },
                            vehicles: true,
                        },
                    },
                },
            });
            return activeCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to find active character');
        }
    },
    getCharacterById: async (characterId) => {
        try {
            const character = await prisma.character.findUnique({
                where: {
                    id: Number(characterId),
                },
                include: {
                    perks: true,
                },
            });
            return character;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch character');
        }
    },
    setActiveCharacter: async (userId, characterId) => {
        try {
            console.log(characterId);
            await prisma.character.updateMany({
                where: { id: { not: Number(characterId) }, userId },
                data: { active: false },
            });
            const activeCharacter = await prisma.character.update({
                where: { id: Number(characterId), userId },
                data: { active: true },
            });
            return activeCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to switch active character');
        }
    },
    createCharacter: async (formData, userId) => {
        try {
            const perks = JSON.parse(formData.perks);
            const stats = JSON.parse(formData.stats);
            const newCharacter = await prisma.character.create({
                data: {
                    userId,
                    firstName: JSON.parse(formData.firstName),
                    lastName: JSON.parse(formData.lastName),
                    stats: {
                        currentHealth: stats.currentHealth,
                        currentSanity: stats.currentSanity,
                        injuries: 0,
                        insanities: 0,
                    },
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    height: Number(JSON.parse(formData.height)),
                    weight: Number(JSON.parse(formData.weight)),
                    age: Number(JSON.parse(formData.age)),
                    sex: JSON.parse(formData.sex),
                    background: JSON.parse(formData.background),
                    attributes: JSON.parse(formData.attributes),
                    perks: {
                        connect: perks.map((id) => ({ id })),
                    },
                },
            });
            return newCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character');
        }
    },
    createCharacterCart: async (characterId) => {
        try {
            await prisma.characterCart.create({
                data: {
                    id: characterId,
                    characterId,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character cart');
        }
    },
    editCart: async (characterId, category, itemId) => {
        try {
            const categories = ['weapons', 'armor', 'cybernetics', 'vehicles'];
            if (!categories.includes(category)) {
                throw new Error(`Invalid category: ${category}`);
            }
            const cart = await prisma.characterCart.findUnique({
                where: { id: Number(characterId) },
                select: { [category]: { select: { id: true } } },
            });
            if (!cart) {
                throw new Error('Cart not found');
            }
            const itemExists = cart[category].some((item) => item.id === Number(itemId));
            const data = itemExists
                ? { [category]: { disconnect: { id: Number(itemId) } } }
                : { [category]: { connect: { id: Number(itemId) } } };
            await prisma.characterCart.update({
                where: { id: Number(characterId) },
                data,
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    createCharacterWeaponCopy: async (characterId, weaponList) => {
        const weaponIds = weaponList === null || weaponList === void 0 ? void 0 : weaponList.map((weapon) => weapon.weaponId);
        const weapons = await prisma.weapon.findMany({
            where: { id: { in: weaponIds } },
        });
        const newWeapons = await Promise.all(weaponList.flatMap(({ weaponId, quantity }) => {
            const weaponDetails = weapons.find((weapon) => weapon.id === weaponId);
            if (weaponDetails) {
                return Array.from({ length: quantity }).map(() => prisma.weapon.create({
                    data: {
                        name: weaponDetails.name,
                        picture: weaponDetails.picture || undefined,
                        description: weaponDetails.description,
                        stats: weaponDetails.stats || {},
                        price: weaponDetails.price,
                        keywords: weaponDetails.keywords,
                        characterInventory: {
                            connect: { id: Number(characterId) },
                        },
                    },
                }));
            }
            return;
        }));
        return newWeapons
            .filter((weapon) => weapon !== undefined)
            .map((weapon) => weapon.id);
    },
    createCharacterArmorCopy: async (characterId, armorList) => {
        const armorIds = armorList === null || armorList === void 0 ? void 0 : armorList.map((armor) => armor.armorId);
        const armor = await prisma.armor.findMany({
            where: { id: { in: armorIds } },
        });
        const newArmor = await Promise.all(armorList.flatMap(({ armorId, quantity }) => {
            const armorDetails = armor.find((armor) => armor.id === armorId);
            if (armorDetails) {
                return Array.from({ length: quantity }).map(() => prisma.armor.create({
                    data: {
                        name: armorDetails.name,
                        picture: armorDetails.picture || undefined,
                        description: armorDetails.description,
                        stats: armorDetails.stats || {},
                        price: armorDetails.price,
                        keywords: armorDetails.keywords,
                        characterInventory: {
                            connect: { id: Number(characterId) },
                        },
                    },
                }));
            }
            return;
        }));
        return newArmor
            .filter((armor) => armor !== undefined)
            .map((armor) => armor.id);
    },
    createCharacterActionCopy: async (characterId, actionList) => {
        const actionIds = actionList === null || actionList === void 0 ? void 0 : actionList.map((action) => action.actionId);
        const actions = await prisma.action.findMany({
            where: { id: { in: actionIds } },
        });
        const newArmor = await Promise.all(actionList.flatMap(({ actionId, quantity }) => {
            const actionDetails = actions.find((action) => action.id === actionId);
            if (actionDetails) {
                return Array.from({ length: quantity }).map(() => prisma.action.create({
                    data: {
                        name: actionDetails.name,
                        description: actionDetails.description,
                        costs: actionDetails.costs || undefined,
                        attribute: actionDetails.attribute,
                        skill: actionDetails.skill,
                        actionType: actionDetails.actionType,
                        actionSubtypes: actionDetails.actionSubtypes,
                        characterInventory: {
                            connect: { id: Number(characterId) },
                        },
                    },
                }));
            }
            return;
        }));
        return newArmor
            .filter((armor) => armor !== undefined)
            .map((armor) => armor.id);
    },
    createCharacterCyberneticCopy: async (characterId, cyberneticList) => {
        const cyberneticIds = cyberneticList === null || cyberneticList === void 0 ? void 0 : cyberneticList.map((cybernetic) => cybernetic.cyberneticId);
        const cybernetics = await prisma.cybernetic.findMany({
            where: { id: { in: cyberneticIds } },
            include: { weapons: true, armor: true, actions: true },
        });
        const promises = [];
        for (const { cyberneticId, quantity } of cyberneticList) {
            const cyberneticDetails = cybernetics.find((cybernetic) => cybernetic.id === cyberneticId);
            let weaponIds = [];
            let armorIds = [];
            let actionIds = [];
            if ((cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.weapons) && (cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.weapons.length) > 0) {
                const weaponInfo = cyberneticDetails.weapons.map((weapon) => {
                    return { weaponId: weapon.id, price: weapon.price, quantity };
                });
                weaponIds = await characterServices.createCharacterWeaponCopy(characterId, weaponInfo);
            }
            if ((cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.armor) && (cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.armor.length) > 0) {
                const armorInfo = cyberneticDetails.armor.map((armor) => {
                    return { armorId: armor.id, price: armor.price, quantity };
                });
                armorIds = await characterServices.createCharacterArmorCopy(characterId, armorInfo);
            }
            if ((cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.actions) && (cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.actions.length) > 0) {
                const actionInfo = cyberneticDetails.actions.map((action) => {
                    return { actionId: action.id, quantity };
                });
                actionIds = await characterServices.createCharacterActionCopy(characterId, actionInfo);
            }
            console.log(actionIds);
            if (cyberneticDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(prisma.cybernetic.create({
                        data: {
                            name: cyberneticDetails.name,
                            cyberneticType: cyberneticDetails.cyberneticType,
                            picture: cyberneticDetails.picture || undefined,
                            description: cyberneticDetails.description,
                            stats: cyberneticDetails.stats || {},
                            body: cyberneticDetails.body,
                            price: cyberneticDetails.price,
                            modifiers: cyberneticDetails.modifiers || undefined,
                            keywords: cyberneticDetails.keywords,
                            weapons: weaponIds.length > 0
                                ? {
                                    connect: weaponIds.map((id) => ({ id })),
                                }
                                : undefined,
                            armor: armorIds.length > 0
                                ? {
                                    connect: armorIds.map((id) => ({ id })),
                                }
                                : undefined,
                            actions: actionIds.length > 0
                                ? {
                                    connect: actionIds.map((id) => ({ id })),
                                }
                                : undefined,
                            characterInventory: {
                                connect: { id: Number(characterId) },
                            },
                        },
                    }));
                }
            }
        }
        await Promise.all(promises);
    },
    addToInventory: async (characterId, formData) => {
        try {
            if (formData.weapons.length > 0) {
                characterServices.createCharacterWeaponCopy(characterId, formData.weapons);
            }
            if (formData.armor.length > 0) {
                characterServices.createCharacterArmorCopy(characterId, formData.armor);
            }
            if (formData.cybernetics.length > 0) {
                characterServices.createCharacterCyberneticCopy(characterId, formData.cybernetics);
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to items to inventory');
        }
    },
    clearCart: async (characterId) => {
        try {
            await prisma.characterCart.update({
                where: { id: Number(characterId) },
                data: {
                    weapons: {
                        set: [],
                    },
                    armor: {
                        set: [],
                    },
                    cybernetics: {
                        set: [],
                    },
                    vehicles: {
                        set: [],
                    },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to clear cart');
        }
    },
    createCharacterInventory: async (characterId) => {
        try {
            await prisma.characterInventory.create({
                data: {
                    id: characterId,
                    characterId,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character inventory');
        }
    },
    updateCharacter: async (formData, userId, characterId) => {
        try {
            const newPerks = JSON.parse(formData.perks).map((id) => ({ id }));
            const oldPerks = await prisma.character
                .findUnique({
                where: {
                    userId,
                    id: Number(characterId),
                },
                select: {
                    perks: { select: { id: true } },
                },
            })
                .then((character) => (character === null || character === void 0 ? void 0 : character.perks.filter((perk) => !newPerks.includes(perk.id))) ||
                [])
                .then((perks) => perks.map((perk) => ({ id: perk.id })));
            const data = Object.assign(Object.assign({ userId, firstName: JSON.parse(formData.firstName), lastName: JSON.parse(formData.lastName), level: Number(JSON.parse(formData.level)), profits: Number(JSON.parse(formData.profits)), stats: JSON.parse(formData.stats) }, (formData.picture && {
                picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
            })), { height: Number(JSON.parse(formData.height)), weight: Number(JSON.parse(formData.weight)), age: Number(JSON.parse(formData.age)), sex: JSON.parse(formData.sex), background: JSON.parse(formData.background), attributes: JSON.parse(formData.attributes), characterCartId: Number(characterId), characterInventoryId: Number(characterId) });
            const updatedCharacter = await prisma.character.update({
                where: {
                    userId,
                    id: Number(characterId),
                },
                data: Object.assign(Object.assign({}, data), { perks: {
                        disconnect: oldPerks,
                        connect: newPerks,
                    } }),
            });
            return updatedCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update character');
        }
    },
    deleteCharacter: async (userId, characterId) => {
        try {
            await prisma.character.delete({
                where: {
                    userId: userId,
                    id: Number(characterId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete character');
        }
    },
};
export default characterServices;
