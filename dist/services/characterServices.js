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
                select: { id: true },
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
                        select: {
                            name: true,
                            characters: true,
                            gangs: true,
                            factions: true,
                            ownerId: true,
                        },
                    },
                    conditions: {
                        include: { condition: true },
                        orderBy: { condition: { name: 'asc' } },
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
                    campaign: {
                        select: {
                            name: true,
                            ownerId: true,
                        },
                    },
                    conditions: {
                        include: { condition: true },
                        orderBy: { condition: { name: 'asc' } },
                    },
                    perks: { include: { modifiers: { include: { action: true } } } },
                    characterInventory: {
                        include: includeCharacterInventory,
                    },
                    characterCart: {
                        include: includeCharacterCart,
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
                    itemTypes: { has: category },
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
    addToInventory: async (userId, characterId, inventoryId) => {
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
                            item: { select: { id: true, price: true, itemTypes: true } },
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
            if (typeof totalPrice !== 'number') {
                throw new Error('Failed to calculate total cart price');
            }
            if (totalPrice > profits) {
                throw new Error('You do not have enough profits to complete this purchase');
            }
            if (items.length > 0) {
                itemServices.createCharacterItemCopy(userId, inventoryId, items);
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
            const data = Object.assign({}, formData);
            if (formData.perks) {
                //@ts-ignore
                data.perks = { set: formData.perks.map((perk) => ({ id: perk })) };
            }
            const updatedCharacter = await prisma.character.update({
                where: {
                    userId,
                    id: Number(characterId),
                },
                //@ts-ignore
                data,
            });
            return updatedCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update character');
        }
    },
    createCharacterConditions: async (userId, characterId, formData) => {
        try {
            const character = await prisma.character.findUnique({
                where: { id: characterId, userId },
                include: {
                    conditions: { select: { id: true } },
                },
            });
            if (!character) {
                throw new Error('Failed to find character');
            }
            if (character && character.conditions) {
                await prisma.characterConditionReference.deleteMany({
                    where: {
                        id: { in: character.conditions.map((condition) => condition.id) },
                    },
                });
            }
            const conditionData = (formData === null || formData === void 0 ? void 0 : formData.map((condition) => ({
                conditionId: condition.conditionId,
                stacks: condition.stacks ? condition.stacks : null,
            }))) || [];
            await prisma.character.update({
                where: {
                    userId: userId,
                    id: characterId,
                },
                data: {
                    conditions: { createMany: { data: conditionData } },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character conditions');
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
