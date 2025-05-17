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
import { equipLinked, includeCharacterCart, includeCharacterInventory, unequipLinked, } from '../utils/linkQueryStructures.js';
import itemServices from './itemServices.js';
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
                        include: includeCharacterCart,
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
    toggleEquipment: async (inventoryId, itemId, category) => {
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                    itemType: category,
                    characterInventoryId: Number(inventoryId),
                },
                select: { id: true, equipped: true },
            });
            if (!item) {
                throw new Error('Item not found');
            }
            await prisma.item.update({
                where: { id: item.id },
                data: { equipped: item.equipped ? false : true },
            });
            await prisma.itemLinkReference.update({
                where: { itemId: item.id },
                data: item.equipped ? unequipLinked : equipLinked,
            });
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
    addToInventory: async (characterId, inventoryId) => {
        var _a;
        try {
            const profits = ((_a = (await prisma.character.findUnique({
                where: { id: characterId },
                select: { profits: true },
            }))) === null || _a === void 0 ? void 0 : _a.profits) || 0;
            const cart = await prisma.characterCart.findUnique({
                where: { characterId },
                select: {
                    items: {
                        include: {
                            item: { select: { id: true, price: true, itemType: true } },
                        },
                    },
                },
            });
            const items = (cart === null || cart === void 0 ? void 0 : cart.items.map((item) => ({
                itemId: item.item.id,
                quantity: item.quantity,
                price: item.item.price,
            }))) || [];
            const totalPrice = cart === null || cart === void 0 ? void 0 : cart.items.flat().map((reference) => {
                const targetObject = Object.values(reference).find((item) => typeof item === 'object');
                return (targetObject === null || targetObject === void 0 ? void 0 : targetObject.price)
                    ? reference.quantity * targetObject.price
                    : 0;
            }).reduce((sum, item) => sum + item, 0);
            if (!totalPrice) {
                throw new Error('Failed to calculate total cart price');
            }
            if (totalPrice > profits) {
                throw new Error('You do not have enough profits to complete this purchase');
            }
            if (items.length > 0) {
                itemServices.createCharacterItemCopy(inventoryId, items);
            }
            await prisma.character.update({
                where: { id: Number(characterId) },
                data: { profits: profits - totalPrice },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to add items to inventory');
        }
    },
    clearCart: async (characterId) => {
        try {
            await prisma.characterCart.update({
                where: { characterId: Number(characterId) },
                data: {
                    items: {
                        deleteMany: {},
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
