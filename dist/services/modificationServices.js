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
const modificationServices = {
    getModifications: async () => {
        try {
            const modificiations = await prisma.item.findMany({
                where: { itemType: 'modification', characterInventoryId: null },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return modificiations;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch modifications');
        }
    },
    getModificationById: async (modId) => {
        try {
            const modification = await prisma.item.findUnique({
                where: {
                    id: Number(modId),
                    itemType: 'modification',
                },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            return modification;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch modification');
        }
    },
    createOrUpdateModification: async (formData) => {
        var _a;
        try {
            const modification = await prisma.item.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0, itemType: 'modification' },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (modification && modification.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: modification.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, itemLinkId, itemIds, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "itemLinkId", "itemIds", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, itemIds, actionIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newModification = await prisma.item.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0, itemType: 'modification' },
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
                    }, keywords: { createMany: { data: keywordData } }, characterInventoryId }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemType: 'modification', itemLinkReference: {
                        create: {
                            items: {
                                connect: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
                            },
                            actions: {
                                connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                            },
                        },
                    }, keywords: { createMany: { data: keywordData } }, characterInventoryId }),
            });
            return newModification;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update modification');
        }
    },
    deleteModification: async (modificationId) => {
        try {
            await prisma.item.delete({
                where: {
                    id: Number(modificationId),
                    itemType: 'modification',
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete modification');
        }
    },
};
export default modificationServices;
