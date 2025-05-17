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
const cyberneticServices = {
    getCybernetics: async () => {
        try {
            const cybernetics = await prisma.item.findMany({
                where: { characterInventoryId: null, itemType: 'augmentation' },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return cybernetics;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetics');
        }
    },
    getCyberneticById: async (cyberneticId) => {
        try {
            const cybernetic = await prisma.item.findUnique({
                where: {
                    id: Number(cyberneticId),
                    itemType: 'augmentation',
                },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            if (!cybernetic) {
                throw new Error('Could not find cybernetic');
            }
            return cybernetic;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetic');
        }
    },
    createOrUpdateCybernetic: async (formData) => {
        var _a;
        try {
            const cybernetic = await prisma.item.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0, itemType: 'augmentation' },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (cybernetic && cybernetic.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: cybernetic.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, itemLinkId, itemIds, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "itemLinkId", "itemIds", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, itemIds, actionIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newCybernetic = await prisma.item.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0, itemType: 'augmentation' },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemLinkReference: {
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
                    }, keywords: { createMany: { data: keywordData } }, characterInventory: characterInventoryId
                        ? {
                            connect: {
                                id: characterInventoryId,
                            },
                        }
                        : undefined }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemType: 'augmentation', itemLinkReference: {
                        create: {
                            items: {
                                connect: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
                            },
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
            return newCybernetic;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create cybernetic');
        }
    },
    deleteCybernetic: async (cyberneticId) => {
        try {
            await prisma.item.delete({
                where: {
                    id: Number(cyberneticId),
                    itemType: 'augmentation',
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete cybernetic');
        }
    },
};
export default cyberneticServices;
