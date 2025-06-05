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
import addVariableStats from '../utils/addVariableStats.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
const itemServices = {
    getItems: async (category) => {
        let excludeAugments = false;
        if ((category === null || category === void 0 ? void 0 : category.includes('weapon')) || (category === null || category === void 0 ? void 0 : category.includes('armor'))) {
            excludeAugments = true;
        }
        try {
            const items = await prisma.item.findMany({
                where: category
                    ? excludeAugments
                        ? {
                            characterInventory: null,
                            itemTypes: { hasEvery: category },
                            NOT: {
                                itemTypes: {
                                    has: 'augmentation',
                                },
                            },
                        }
                        : {
                            characterInventory: null,
                            itemTypes: { hasEvery: category },
                        }
                    : { characterInventory: null },
                include: {
                    itemLinkReference: {
                        include: {
                            items: {
                                include: {
                                    keywords: {
                                        include: { keyword: true },
                                        orderBy: { keyword: { name: 'asc' } },
                                    },
                                    modifiedKeywords: {
                                        include: { keyword: true },
                                        orderBy: { keyword: { name: 'asc' } },
                                    },
                                    conditions: {
                                        include: { condition: true },
                                        orderBy: { condition: { name: 'asc' } },
                                    },
                                },
                            },
                            actions: true,
                        },
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                    modifiedKeywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                    conditions: {
                        include: { condition: true },
                        orderBy: { condition: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return items;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch items');
        }
    },
    getItemById: async (itemId) => {
        try {
            const item = await prisma.item.findUnique({
                where: { id: itemId },
                include: {
                    baseItem: true,
                    itemLinkReference: {
                        include: {
                            items: {
                                include: {
                                    keywords: {
                                        include: { keyword: true },
                                        orderBy: { keyword: { name: 'asc' } },
                                    },
                                    modifiedKeywords: {
                                        include: { keyword: true },
                                        orderBy: { keyword: { name: 'asc' } },
                                    },
                                    conditions: {
                                        include: { condition: true },
                                        orderBy: { condition: { name: 'asc' } },
                                    },
                                },
                            },
                            actions: true,
                        },
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                    modifiedKeywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                    conditions: {
                        include: { condition: true },
                        orderBy: { condition: { name: 'asc' } },
                    },
                },
            });
            return item;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch item');
        }
    },
    createOrUpdateItem: async (formData, category) => {
        var _a;
        try {
            const item = await prisma.item.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0, itemTypes: { hasEvery: category } },
                include: {
                    keywords: { select: { id: true } },
                    modifiedKeywords: { select: { id: true } },
                },
            });
            if (item && item.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: item.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            if (item && item.modifiedKeywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: item.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, itemLinkId, itemIds, actionIds, keywordIds, modifiedKeywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "itemLinkId", "itemIds", "actionIds", "keywordIds", "modifiedKeywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, itemIds, actionIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const modifiedKeywordData = (modifiedKeywordIds === null || modifiedKeywordIds === void 0 ? void 0 : modifiedKeywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newItem = await prisma.item.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0 },
                update: Object.assign(Object.assign(Object.assign({}, data), (stats ? { stats } : {})), { updatedAt: new Date(), itemLinkReference: {
                        upsert: {
                            where: { itemId: id !== null && id !== void 0 ? id : 0 },
                            update: {
                                items: {
                                    set: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
                                },
                                actions: {
                                    set: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                            create: {
                                items: {
                                    connect: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
                                },
                                actions: {
                                    connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                        },
                    }, keywords: { createMany: { data: keywordData } }, modifiedKeywords: { createMany: { data: modifiedKeywordData } }, characterInventoryId }),
                create: Object.assign(Object.assign(Object.assign({}, data), (stats ? { stats } : {})), { itemLinkReference: {
                        create: {
                            items: {
                                connect: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
                            },
                            actions: {
                                connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                            },
                        },
                    }, keywords: { createMany: { data: keywordData } }, modifiedKeywords: { createMany: { data: modifiedKeywordData } }, characterInventoryId }),
            });
            return newItem;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update item');
        }
    },
    createCharacterItemCopy: async (userId, inventoryId, itemList) => {
        const itemIds = itemList === null || itemList === void 0 ? void 0 : itemList.map((item) => item.itemId);
        const items = await prisma.item.findMany({
            where: { id: { in: itemIds } },
            include: {
                itemLinkReference: { include: { items: true, actions: true } },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { itemId, quantity } of itemList) {
            const itemDetails = items.find((item) => item.id === itemId);
            if (!itemDetails)
                continue;
            const stats = itemDetails.stats
                ? addVariableStats(Object.assign({}, itemDetails.stats))
                : null;
            const { itemIds, actionIds } = await createLinkedCopies(userId, itemDetails.itemLinkReference, inventoryId, quantity);
            const keywordIds = (itemDetails === null || itemDetails === void 0 ? void 0 : itemDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = itemDetails, rest = __rest(itemDetails, ["keywords"]);
            const itemData = Object.assign(Object.assign({}, rest), { stats,
                itemIds,
                actionIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseItemId: itemDetails.id, userId });
            if (itemDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(itemServices.createOrUpdateItem(itemData, itemData.itemTypes));
                }
            }
        }
        const newItems = await Promise.all(promises);
        return newItems.filter((item) => item !== undefined).map((item) => item.id);
    },
    createItemConditions: async (itemId, formData) => {
        try {
            const item = await prisma.item.findUnique({
                where: { id: itemId },
                include: {
                    conditions: { select: { id: true } },
                },
            });
            if (!item) {
                throw new Error('Failed to find character');
            }
            if (item && item.conditions) {
                await prisma.itemConditionReference.deleteMany({
                    where: {
                        id: { in: item.conditions.map((condition) => condition.id) },
                    },
                });
            }
            const conditionData = (formData === null || formData === void 0 ? void 0 : formData.map((condition) => ({
                conditionId: condition.conditionId,
                stacks: condition.stacks ? condition.stacks : null,
            }))) || [];
            await prisma.item.update({
                where: {
                    id: itemId,
                },
                data: {
                    conditions: { createMany: { data: conditionData } },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create item conditions');
        }
    },
    deleteItem: async (itemId) => {
        try {
            await prisma.item.delete({
                where: {
                    id: Number(itemId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete item');
        }
    },
    deleteItems: async (itemIds, category) => {
        try {
            await prisma.item.deleteMany({
                where: category
                    ? {
                        id: { in: itemIds },
                        itemTypes: { hasSome: category },
                    }
                    : {
                        itemTypes: { hasSome: category },
                    },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete items');
        }
    },
};
export default itemServices;
