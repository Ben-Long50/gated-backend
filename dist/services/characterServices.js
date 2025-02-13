var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Prisma, } from '@prisma/client';
import prisma from '../config/database.js';
const characterServices = {
    getCharacters: async (userId) => {
        try {
            const characters = await prisma.character.findMany({
                where: {
                    userId,
                },
                include: {
                    perks: { include: { modifiers: { include: { action: true } } } },
                    characterInventory: {
                        include: {
                            weapons: {
                                include: { actions: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            armor: {
                                include: { actions: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            cybernetics: {
                                include: {
                                    weapons: true,
                                    armor: true,
                                    actions: true,
                                    modifiers: { include: { action: true } },
                                },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            vehicles: {
                                include: { weapons: true, modifications: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            modifications: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            items: {
                                include: {
                                    actions: true,
                                    modifiers: { include: { action: true } },
                                },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                        },
                    },
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
                    perks: { include: { modifiers: { include: { action: true } } } },
                    characterCart: {
                        include: {
                            weapons: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            armor: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            cybernetics: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            vehicles: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            modifications: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            items: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                        },
                    },
                    characterInventory: {
                        include: {
                            weapons: {
                                include: { actions: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            armor: {
                                include: { actions: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            cybernetics: {
                                include: {
                                    weapons: true,
                                    armor: true,
                                    actions: true,
                                    modifiers: { include: { action: true } },
                                },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            vehicles: {
                                include: { weapons: true, modifications: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            modifications: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            items: {
                                include: {
                                    actions: true,
                                    modifiers: { include: { action: true } },
                                },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
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
                    perks: { include: { modifiers: { include: { action: true } } } },
                    characterInventory: {
                        include: {
                            weapons: {
                                include: { actions: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            armor: {
                                include: { actions: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            cybernetics: {
                                include: {
                                    weapons: true,
                                    armor: true,
                                    actions: true,
                                    modifiers: { include: { action: true } },
                                },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            vehicles: {
                                include: { weapons: true, modifications: true },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                            modifications: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
                            items: {
                                include: {
                                    actions: true,
                                    modifiers: { include: { action: true } },
                                },
                                orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                            },
                        },
                    },
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
    getEquippedItems: async (characterId, inventoryId) => {
        try {
            const equipment = await prisma.characterInventory.findUnique({
                where: { characterId: Number(characterId), id: Number(inventoryId) },
                select: {
                    weapons: { where: { equipped: true }, orderBy: { name: 'asc' } },
                    armor: { where: { equipped: true }, orderBy: { name: 'asc' } },
                    cybernetics: {
                        where: { equipped: true },
                        include: { actions: true },
                        orderBy: { name: 'asc' },
                    },
                    actions: true,
                    items: {
                        where: { equipped: true },
                        include: { actions: true },
                        orderBy: { name: 'asc' },
                    },
                },
            });
            return equipment;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch character equipment');
        }
    },
    toggleEquipment: async (inventoryId, itemId, category) => {
        try {
            const categories = ['weapon', 'armor', 'cybernetic', 'item'];
            if (!categories.includes(category)) {
                throw new Error(`Invalid category: ${category}`);
            }
            const item = 
            // @ts-ignore
            await prisma[category].findUnique({
                where: {
                    id: Number(itemId),
                    characterInventoryId: Number(inventoryId),
                },
                select: { equipped: true },
            });
            if (!item) {
                throw new Error('Item not found');
            }
            category === 'cybernetic'
                ? // @ts-ignore
                    await prisma[category].update({
                        where: {
                            id: Number(itemId),
                            characterInventoryId: Number(inventoryId),
                        },
                        data: {
                            equipped: !item.equipped,
                            weapons: {
                                updateMany: {
                                    where: {},
                                    data: {
                                        equipped: !item.equipped,
                                    },
                                },
                            },
                            armor: {
                                updateMany: {
                                    where: {},
                                    data: {
                                        equipped: !item.equipped,
                                    },
                                },
                            },
                        },
                    })
                : // @ts-ignore
                    await prisma[category].update({
                        where: {
                            id: Number(itemId),
                            characterInventoryId: Number(inventoryId),
                        },
                        data: {
                            equipped: !item.equipped,
                        },
                    });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to toggle equipment');
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
            await characterServices.createCharacterCart(newCharacter.id);
            await characterServices.createCharacterInventory(newCharacter.id);
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
                    character: { connect: { id: characterId } },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character cart');
        }
    },
    createCharacterInventory: async (characterId) => {
        try {
            await prisma.characterInventory.create({
                data: {
                    character: { connect: { id: characterId } },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character inventory');
        }
    },
    editCart: async (characterId, cartId, category, itemId) => {
        try {
            const categories = [
                'weapons',
                'armor',
                'cybernetics',
                'vehicles',
                'modifications',
                'items',
            ];
            if (!categories.includes(category)) {
                throw new Error(`Invalid category: ${category}`);
            }
            const cart = await prisma.characterCart.findUnique({
                where: { id: Number(cartId), characterId: Number(characterId) },
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
                where: { id: Number(cartId) },
                data,
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add item to cart');
        }
    },
    createCharacterWeaponCopy: async (inventoryId, weaponList) => {
        const weaponIds = weaponList === null || weaponList === void 0 ? void 0 : weaponList.map((weapon) => weapon.weaponId);
        const weapons = await prisma.weapon.findMany({
            where: { id: { in: weaponIds } },
            include: { actions: true },
        });
        const promises = [];
        for (const { weaponId, quantity } of weaponList) {
            const weaponDetails = weapons.find((weapon) => weapon.id === weaponId);
            let stats = weaponDetails && Object.assign({}, weaponDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.magCount) && !(stats === null || stats === void 0 ? void 0 : stats.currentMagCount)) {
                stats = Object.assign(Object.assign({}, stats), { currentMagCount: stats.magCount - 1 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.magCapacity) && !(stats === null || stats === void 0 ? void 0 : stats.currentAmmoCount)) {
                stats = Object.assign(Object.assign({}, stats), { currentAmmoCount: stats.magCapacity });
            }
            let actionIds = [];
            if ((weaponDetails === null || weaponDetails === void 0 ? void 0 : weaponDetails.actions) && (weaponDetails === null || weaponDetails === void 0 ? void 0 : weaponDetails.actions.length) > 0) {
                const actionInfo = weaponDetails.actions.map((action) => {
                    return { actionId: action.id, quantity };
                });
                actionIds = await characterServices.createCharacterActionCopy(inventoryId, actionInfo);
            }
            if (weaponDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(prisma.weapon.create({
                        data: {
                            name: weaponDetails.name,
                            rarity: weaponDetails.rarity,
                            grade: weaponDetails.grade,
                            picture: weaponDetails.picture || undefined,
                            description: weaponDetails.description,
                            stats: stats || {},
                            price: weaponDetails.price,
                            keywords: weaponDetails.keywords,
                            actions: actionIds.length > 0
                                ? {
                                    connect: actionIds.map((id) => ({ id })),
                                }
                                : undefined,
                            characterInventory: {
                                connect: { id: Number(inventoryId) },
                            },
                            baseWeaponId: weaponDetails.id,
                        },
                    }));
                }
            }
        }
        const newWeapon = await Promise.all(promises);
        return newWeapon
            .filter((weapon) => weapon !== undefined)
            .map((weapon) => weapon.id);
    },
    createCharacterArmorCopy: async (inventoryId, armorList) => {
        const armorIds = armorList === null || armorList === void 0 ? void 0 : armorList.map((armor) => armor.armorId);
        const armor = await prisma.armor.findMany({
            where: { id: { in: armorIds } },
            include: { actions: true },
        });
        const promises = [];
        for (const { armorId, quantity } of armorList) {
            const armorDetails = armor.find((armor) => armor.id === armorId);
            let stats = armorDetails && Object.assign({}, armorDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.block) && !(stats === null || stats === void 0 ? void 0 : stats.currentBlock)) {
                stats = Object.assign(Object.assign({}, stats), { currentBlock: stats.block });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            let actionIds = [];
            if ((armorDetails === null || armorDetails === void 0 ? void 0 : armorDetails.actions) && (armorDetails === null || armorDetails === void 0 ? void 0 : armorDetails.actions.length) > 0) {
                const actionInfo = armorDetails.actions.map((action) => {
                    return { actionId: action.id, quantity };
                });
                actionIds = await characterServices.createCharacterActionCopy(inventoryId, actionInfo);
            }
            if (armorDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(prisma.armor.create({
                        data: {
                            name: armorDetails.name,
                            rarity: armorDetails.rarity,
                            grade: armorDetails.grade,
                            picture: armorDetails.picture || undefined,
                            description: armorDetails.description,
                            stats: stats || {},
                            price: armorDetails.price,
                            keywords: armorDetails.keywords,
                            actions: actionIds.length > 0
                                ? {
                                    connect: actionIds.map((id) => ({ id })),
                                }
                                : undefined,
                            characterInventory: {
                                connect: { id: Number(inventoryId) },
                            },
                            baseArmorId: armorDetails.id,
                        },
                    }));
                }
            }
        }
        const newArmor = await Promise.all(promises);
        return newArmor
            .filter((armor) => armor !== undefined)
            .map((armor) => armor.id);
    },
    createCharacterActionCopy: async (inventoryId, actionList) => {
        const actionIds = actionList === null || actionList === void 0 ? void 0 : actionList.map((action) => action.actionId);
        const actions = await prisma.action.findMany({
            where: { id: { in: actionIds } },
        });
        const newAction = await Promise.all(actionList.flatMap(({ actionId, quantity }) => {
            const actionDetails = actions.find((action) => action.id === actionId);
            if (actionDetails) {
                return Array.from({ length: quantity }).map(() => prisma.action.create({
                    data: {
                        name: actionDetails.name,
                        description: actionDetails.description,
                        costs: actionDetails.costs || undefined,
                        roll: actionDetails.roll || undefined,
                        duration: actionDetails.duration || undefined,
                        actionType: actionDetails.actionType,
                        actionSubtypes: actionDetails.actionSubtypes,
                        characterInventory: {
                            connect: { id: Number(inventoryId) },
                        },
                        baseActionId: actionDetails.id,
                    },
                }));
            }
            return;
        }));
        return newAction
            .filter((action) => action !== undefined)
            .map((action) => action.id);
    },
    createCharacterCyberneticCopy: async (inventoryId, cyberneticList) => {
        const cyberneticIds = cyberneticList === null || cyberneticList === void 0 ? void 0 : cyberneticList.map((cybernetic) => cybernetic.cyberneticId);
        const cybernetics = await prisma.cybernetic.findMany({
            where: { id: { in: cyberneticIds } },
            include: {
                weapons: true,
                armor: true,
                actions: true,
                modifiers: { include: { action: true } },
            },
        });
        const promises = [];
        for (const { cyberneticId, quantity } of cyberneticList) {
            const cyberneticDetails = cybernetics.find((cybernetic) => cybernetic.id === cyberneticId);
            let stats = cyberneticDetails && Object.assign({}, cyberneticDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            let weaponIds = [];
            let armorIds = [];
            let actionIds = [];
            if ((cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.weapons) && (cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.weapons.length) > 0) {
                const weaponInfo = cyberneticDetails.weapons.map((weapon) => {
                    return { weaponId: weapon.id, price: weapon.price, quantity };
                });
                weaponIds =
                    (await characterServices.createCharacterWeaponCopy(inventoryId, weaponInfo)) || [];
            }
            if ((cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.armor) && (cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.armor.length) > 0) {
                const armorInfo = cyberneticDetails.armor.map((armor) => {
                    return { armorId: armor.id, price: armor.price, quantity };
                });
                armorIds =
                    (await characterServices.createCharacterArmorCopy(inventoryId, armorInfo)) || [];
            }
            if ((cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.actions) && (cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.actions.length) > 0) {
                const actionInfo = cyberneticDetails.actions.map((action) => {
                    return { actionId: action.id, quantity };
                });
                actionIds = await characterServices.createCharacterActionCopy(inventoryId, actionInfo);
            }
            if (cyberneticDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(prisma.cybernetic.create({
                        data: {
                            name: cyberneticDetails.name,
                            rarity: cyberneticDetails.rarity,
                            grade: cyberneticDetails.grade,
                            cyberneticType: cyberneticDetails.cyberneticType,
                            picture: cyberneticDetails.picture || undefined,
                            description: cyberneticDetails.description,
                            stats: stats || {},
                            body: cyberneticDetails.body,
                            price: cyberneticDetails.price,
                            modifiers: {
                                createMany: {
                                    data: cyberneticDetails.modifiers.map((_a) => {
                                        var { id, cyberneticId, itemId, action, perkId, duration } = _a, modifier = __rest(_a, ["id", "cyberneticId", "itemId", "action", "perkId", "duration"]);
                                        return (Object.assign(Object.assign({}, modifier), { duration: duration === null ? Prisma.JsonNull : duration }));
                                    }),
                                },
                            },
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
                                connect: { id: Number(inventoryId) },
                            },
                            baseCyberneticId: cyberneticDetails.id,
                        },
                    }));
                }
            }
        }
        await Promise.all(promises);
    },
    createCharacterModificationCopy: async (inventoryId, modList) => {
        const modIds = modList === null || modList === void 0 ? void 0 : modList.map((mod) => mod.modId);
        const mods = await prisma.modification.findMany({
            where: { id: { in: modIds } },
        });
        const newMods = await Promise.all(modList.flatMap(({ modId, quantity }) => {
            const modDetails = mods.find((mod) => mod.id === modId);
            if (modDetails) {
                return Array.from({ length: quantity }).map(() => prisma.modification.create({
                    data: {
                        name: modDetails.name,
                        rarity: modDetails.rarity,
                        grade: modDetails.grade,
                        modificationType: modDetails.modificationType,
                        description: modDetails.description,
                        price: modDetails.price,
                        characterInventory: {
                            connect: { id: Number(inventoryId) },
                        },
                        baseModificationId: modDetails.id,
                    },
                }));
            }
            return;
        }));
        return newMods.filter((mod) => mod !== undefined).map((mod) => mod.id);
    },
    createCharacterVehicleCopy: async (inventoryId, vehicleList) => {
        const vehicleIds = vehicleList === null || vehicleList === void 0 ? void 0 : vehicleList.map((vehicle) => vehicle.vehicleId);
        const vehicles = await prisma.vehicle.findMany({
            where: { id: { in: vehicleIds } },
            include: {
                weapons: { select: { id: true } },
                modifications: { select: { id: true } },
            },
        });
        const promises = [];
        for (const { vehicleId, quantity } of vehicleList) {
            const vehicleDetails = vehicles.find((vehicle) => vehicle.id === vehicleId);
            let stats = vehicleDetails && Object.assign({}, vehicleDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.hull) && !(stats === null || stats === void 0 ? void 0 : stats.currentHull)) {
                stats = Object.assign(Object.assign({}, stats), { currentHull: stats.hull });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.cargo) && !(stats === null || stats === void 0 ? void 0 : stats.currentCargo)) {
                stats = Object.assign(Object.assign({}, stats), { currentCargo: 0 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.hangar) && !(stats === null || stats === void 0 ? void 0 : stats.currentHangar)) {
                stats = Object.assign(Object.assign({}, stats), { currentHangar: 0 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.pass) && !(stats === null || stats === void 0 ? void 0 : stats.currentPass)) {
                stats = Object.assign(Object.assign({}, stats), { currentPass: 0 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.weapon) && !(stats === null || stats === void 0 ? void 0 : stats.currentWeapon)) {
                stats = Object.assign(Object.assign({}, stats), { currentWeapon: vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.weapons.length });
            }
            let weaponIds = [];
            let modificationIds = [];
            if ((vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.weapons) && (vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.weapons.length) > 0) {
                const weaponInfo = vehicleDetails.weapons.map((weapon) => ({
                    weaponId: weapon.id,
                    price: null,
                    quantity,
                }));
                weaponIds =
                    (await characterServices.createCharacterWeaponCopy(inventoryId, weaponInfo)) || [];
            }
            if ((vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.modifications) &&
                (vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.modifications.length) > 0) {
                const modificationInfo = vehicleDetails.modifications.map((modification) => ({
                    modId: modification.id,
                    price: null,
                    quantity,
                }));
                modificationIds =
                    await characterServices.createCharacterModificationCopy(inventoryId, modificationInfo);
            }
            if (vehicleDetails) {
                for (let i = 0; i < quantity; i++) {
                    const newWeaponIds = weaponIds
                        .splice(0, vehicleDetails.weapons.length)
                        .map((id) => ({ id }));
                    const newModIds = modificationIds
                        .splice(0, vehicleDetails.modifications.length)
                        .map((id) => ({ id }));
                    promises.push(prisma.vehicle.create({
                        data: {
                            name: vehicleDetails.name,
                            rarity: vehicleDetails.rarity,
                            grade: vehicleDetails.grade,
                            picture: vehicleDetails.picture || undefined,
                            description: vehicleDetails.description,
                            stats: stats || {},
                            price: vehicleDetails.price,
                            weapons: {
                                connect: newWeaponIds.length > 0 ? newWeaponIds : undefined,
                            },
                            modifications: {
                                connect: modificationIds.length > 0 ? newModIds : undefined,
                            },
                            characterInventory: {
                                connect: { id: Number(inventoryId) },
                            },
                            baseVehicleId: vehicleDetails.id,
                        },
                    }));
                }
            }
        }
        await Promise.all(promises);
    },
    createCharacterItemCopy: async (inventoryId, itemList) => {
        const itemIds = itemList === null || itemList === void 0 ? void 0 : itemList.map((item) => item.itemId);
        const items = await prisma.item.findMany({
            where: { id: { in: itemIds } },
            include: { actions: true, modifiers: { include: { action: true } } },
        });
        const promises = [];
        for (const { itemId, quantity } of itemList) {
            const characterItemDetails = await prisma.item.findFirst({
                where: {
                    baseItemId: itemId,
                    characterInventoryId: Number(inventoryId),
                    category: 'consumable',
                },
                include: { actions: true, modifiers: { include: { action: true } } },
            });
            const itemDetails = characterItemDetails || items.find((item) => item.id === itemId);
            let stats = itemDetails && Object.assign({}, itemDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.currentStacks) && !(stats === null || stats === void 0 ? void 0 : stats.maxStacks)) {
                stats = Object.assign(Object.assign({}, stats), { currentStacks: (stats === null || stats === void 0 ? void 0 : stats.currentStacks) === 1
                        ? quantity
                        : (stats === null || stats === void 0 ? void 0 : stats.currentStacks) + quantity });
            }
            if (characterItemDetails) {
                await prisma.item.update({
                    where: { id: characterItemDetails.id },
                    data: { stats },
                });
                continue;
            }
            let actionIds = [];
            if ((itemDetails === null || itemDetails === void 0 ? void 0 : itemDetails.actions) && (itemDetails === null || itemDetails === void 0 ? void 0 : itemDetails.actions.length) > 0) {
                const actionInfo = itemDetails.actions.map((action) => {
                    return { actionId: action.id, quantity };
                });
                actionIds = await characterServices.createCharacterActionCopy(inventoryId, actionInfo);
            }
            if (itemDetails) {
                const { id, characterInventoryId, picture, modifiers } = itemDetails, itemData = __rest(itemDetails, ["id", "characterInventoryId", "picture", "modifiers"]);
                const count = (stats === null || stats === void 0 ? void 0 : stats.currentStacks) && !(stats === null || stats === void 0 ? void 0 : stats.maxStacks) ? 1 : quantity;
                for (let i = 0; i < count; i++) {
                    promises.push(prisma.item.create({
                        data: Object.assign(Object.assign({}, itemData), { picture: picture || undefined, stats: stats || {}, actions: actionIds.length > 0
                                ? {
                                    connect: actionIds.map((id) => ({ id })),
                                }
                                : undefined, modifiers: {
                                createMany: {
                                    data: itemDetails.modifiers.map((_a) => {
                                        var { id, cyberneticId, itemId, action, perkId, duration } = _a, modifier = __rest(_a, ["id", "cyberneticId", "itemId", "action", "perkId", "duration"]);
                                        return (Object.assign(Object.assign({}, modifier), { duration: duration === null ? Prisma.JsonNull : duration }));
                                    }),
                                },
                            }, characterInventory: inventoryId
                                ? { connect: { id: Number(inventoryId) } }
                                : undefined, baseItemId: id }),
                    }));
                }
            }
        }
        await Promise.all(promises);
    },
    addToInventory: async (characterId, inventoryId, formData) => {
        var _a;
        try {
            const profits = ((_a = (await prisma.character.findUnique({
                where: { id: Number(characterId) },
                select: { profits: true },
            }))) === null || _a === void 0 ? void 0 : _a.profits) || 0;
            const totalPrice = Object.values(formData)
                .flatMap((category) => category.map((item) => item.price * item.quantity))
                .reduce((sum, price) => sum + price, 0);
            if (totalPrice > profits) {
                throw new Error('You do not have enough profits to complete this purchase');
            }
            if (formData.weapons.length > 0) {
                characterServices.createCharacterWeaponCopy(inventoryId, formData.weapons);
            }
            if (formData.armor.length > 0) {
                characterServices.createCharacterArmorCopy(inventoryId, formData.armor);
            }
            if (formData.cybernetics.length > 0) {
                characterServices.createCharacterCyberneticCopy(inventoryId, formData.cybernetics);
            }
            if (formData.vehicles.length > 0) {
                characterServices.createCharacterVehicleCopy(inventoryId, formData.vehicles);
            }
            if (formData.modifications.length > 0) {
                characterServices.createCharacterModificationCopy(inventoryId, formData.modifications);
            }
            if (formData.items.length > 0) {
                characterServices.createCharacterItemCopy(inventoryId, formData.items);
            }
            await prisma.character.update({
                where: { id: Number(characterId) },
                data: { profits: profits - totalPrice },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to items to inventory');
        }
    },
    clearCart: async (characterId) => {
        try {
            await prisma.characterCart.update({
                where: { characterId: Number(characterId) },
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
                    modifications: {
                        set: [],
                    },
                    items: {
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
    updateCharacter: async (formData, userId, characterId) => {
        try {
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return JSON.parse(formData.picture);
                }
            };
            const pictureInfo = getPictureInfo();
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
            const data = {
                firstName: JSON.parse(formData.firstName),
                lastName: JSON.parse(formData.lastName),
                picture: pictureInfo,
                level: Number(JSON.parse(formData.level)),
                profits: Number(JSON.parse(formData.profits)),
                stats: JSON.parse(formData.stats),
                height: Number(JSON.parse(formData.height)),
                weight: Number(JSON.parse(formData.weight)),
                age: Number(JSON.parse(formData.age)),
                sex: JSON.parse(formData.sex),
                background: JSON.parse(formData.background),
                attributes: JSON.parse(formData.attributes),
            };
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
