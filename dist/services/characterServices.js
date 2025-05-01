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
import prisma from '../config/database.js';
import { equipLinked, includeCharacterInventory, unequipLinked, } from '../utils/linkQueryStructures.js';
import weaponServices from './weaponServices.js';
import armorServices from './armorServices.js';
import cyberneticServices from './cyberneticServices.js';
import vehicleServices from './vehicleServices.js';
import itemServices from './itemServices.js';
import modificationServices from './modificationServices.js';
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
                        include: includeCharacterInventory,
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
                    campaign: {
                        select: { characters: true, gangs: true, factions: true },
                    },
                    affiliations: { include: { factions: true, characters: true } },
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
                        include: includeCharacterInventory,
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
                    campaign: { select: { name: true, id: true } },
                    perks: { include: { modifiers: { include: { action: true } } } },
                    characterInventory: {
                        include: includeCharacterInventory,
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
    // getEquippedItems: async (characterId: string, inventoryId: string) => {
    //   try {
    //     const equipment = await prisma.characterInventory.findUnique({
    //       where: { characterId: Number(characterId), id: Number(inventoryId) },
    //       select: {
    //         weapons: {
    //           where: { equipped: true },
    //           include: { keywords: { include: { keyword: true } } },
    //           orderBy: { name: 'asc' },
    //         },
    //         armor: {
    //           where: { equipped: true },
    //           include: { keywords: { include: { keyword: true } } },
    //           orderBy: { name: 'asc' },
    //         },
    //         cybernetics: {
    //           where: { equipped: true },
    //           include: {
    //             keywords: { include: { keyword: true } },
    //             actions: true,
    //           },
    //           orderBy: { name: 'asc' },
    //         },
    //         actions: true,
    //         items: {
    //           where: { equipped: true },
    //           include: { actions: true },
    //           orderBy: { name: 'asc' },
    //         },
    //       },
    //     });
    //     return equipment;
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error('Failed to fetch character equipment');
    //   }
    // },
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
                select: { id: true, equipped: true },
            });
            if (!item) {
                throw new Error('Item not found');
            }
            if (category === 'cybernetic') {
                await prisma.cybernetic.update({
                    where: {
                        id: Number(itemId),
                        characterInventoryId: Number(inventoryId),
                    },
                    data: {
                        equipped: !item.equipped,
                    },
                });
                await prisma.cyberneticLinkReference.update({
                    where: { cyberneticId: item.id },
                    data: item.equipped ? unequipLinked : equipLinked,
                });
            }
            if (category === 'weapon') {
                await prisma.weapon.update({
                    where: {
                        id: Number(itemId),
                        characterInventoryId: Number(inventoryId),
                    },
                    data: {
                        equipped: !item.equipped,
                    },
                });
                await prisma.weaponLinkReference.update({
                    where: { weaponId: item.id },
                    data: item.equipped ? unequipLinked : equipLinked,
                });
            }
            if (category === 'armor') {
                await prisma.armor.update({
                    where: {
                        id: Number(itemId),
                        characterInventoryId: Number(inventoryId),
                    },
                    data: {
                        equipped: !item.equipped,
                    },
                });
                await prisma.armorLinkReference.update({
                    where: { armorId: item.id },
                    data: item.equipped ? unequipLinked : equipLinked,
                });
            }
            if (category === 'item') {
                await prisma.item.update({
                    where: {
                        id: Number(itemId),
                        characterInventoryId: Number(inventoryId),
                    },
                    data: {
                        equipped: !item.equipped,
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to toggle equipment');
        }
    },
    createCharacter: async (formData, userId) => {
        var _a, _b, _c;
        try {
            const data = Object.assign(Object.assign({}, formData), { userId, stats: {
                    currentHealth: (_a = formData.stats) === null || _a === void 0 ? void 0 : _a.currentHealth,
                    currentSanity: (_b = formData.stats) === null || _b === void 0 ? void 0 : _b.currentSanity,
                    injuries: 0,
                    insanities: 0,
                }, perks: {
                    connect: ((_c = formData.perks) === null || _c === void 0 ? void 0 : _c.map((id) => ({ id }))) || [],
                } });
            const newCharacter = await prisma.character.create({
                data,
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
                weaponServices.createCharacterWeaponCopy(inventoryId, formData.weapons);
            }
            if (formData.armor.length > 0) {
                armorServices.createCharacterArmorCopy(inventoryId, formData.armor);
            }
            if (formData.cybernetics.length > 0) {
                cyberneticServices.createCharacterCyberneticCopy(inventoryId, formData.cybernetics);
            }
            if (formData.vehicles.length > 0) {
                vehicleServices.createCharacterVehicleCopy(inventoryId, formData.vehicles);
            }
            if (formData.modifications.length > 0) {
                modificationServices.createCharacterModificationCopy(inventoryId, formData.modifications);
            }
            if (formData.items.length > 0) {
                itemServices.createCharacterItemCopy(inventoryId, formData.items);
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
            const _a = Object.assign({}, formData), { perks, stats } = _a, data = __rest(_a, ["perks", "stats"]);
            const updatedCharacter = await prisma.character.update({
                where: {
                    userId,
                    id: Number(characterId),
                },
                data: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), perks: { set: (perks === null || perks === void 0 ? void 0 : perks.map((id) => ({ id }))) || [] } }),
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
