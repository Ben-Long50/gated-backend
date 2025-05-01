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
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
const itemServices = {
    getItems: async () => {
        try {
            const items = await prisma.item.findMany({
                where: { characterInventory: null },
                include: {
                    itemLinkReference: {
                        include: { actions: { orderBy: { name: 'asc' } } },
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
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
                where: { id: Number(itemId) },
                include: {
                    itemLinkReference: {
                        include: { actions: { orderBy: { name: 'asc' } } },
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
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
    createOrUpdateItem: async (formData) => {
        try {
            const item = await prisma.item.findUnique({
                where: { id: formData.id },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (item && item.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: item.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, undefined, undefined, undefined, actionIds, undefined);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newItem = await prisma.item.upsert({
                where: { id: formData.id },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemLinkReference: {
                        upsert: {
                            where: { itemId: id },
                            update: {
                                actions: {
                                    set: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                            create: {
                                actions: {
                                    connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                        },
                    }, keywords: { createMany: { data: keywordData } }, characterInventory: characterInventoryId
                        ? {
                            connect: {
                                id: characterInventoryId,
                            },
                        }
                        : undefined }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemLinkReference: {
                        create: {
                            actions: {
                                connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                            },
                        },
                    }, keywords: { createMany: { data: keywordData } }, characterInventory: characterInventoryId
                        ? {
                            connect: {
                                id: characterInventoryId,
                            },
                        }
                        : undefined }),
            });
            return newItem;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update item');
        }
    },
    createCharacterItemCopy: async (inventoryId, itemList) => {
        const itemIds = itemList === null || itemList === void 0 ? void 0 : itemList.map((item) => item.itemId);
        const items = await prisma.item.findMany({
            where: { id: { in: itemIds } },
            include: {
                itemLinkReference: { include: { actions: true } },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { itemId, quantity } of itemList) {
            const itemDetails = items.find((item) => item.id === itemId);
            if (!itemDetails)
                continue;
            let stats = Object.assign({}, itemDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            const { actionIds } = await createLinkedCopies(itemDetails.itemLinkReference, inventoryId, quantity);
            const keywordIds = (itemDetails === null || itemDetails === void 0 ? void 0 : itemDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = itemDetails, rest = __rest(itemDetails, ["keywords"]);
            const itemData = Object.assign(Object.assign({}, rest), { stats,
                actionIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseItemId: itemDetails.id });
            if (itemDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(itemServices.createOrUpdateItem(itemData));
                }
            }
        }
        const newItems = await Promise.all(promises);
        return newItems.filter((item) => item !== undefined).map((item) => item.id);
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
    deleteItems: async (itemIds) => {
        try {
            await prisma.item.deleteMany({
                where: {
                    id: { in: itemIds },
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
