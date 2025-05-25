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
const armorServices = {
    getArmor: async () => {
        try {
            const armor = await prisma.item.findMany({
                where: {
                    itemType: 'armor',
                    characterInventoryId: null,
                    itemLinkId: null,
                },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return armor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    },
    getArmorById: async (armorId) => {
        try {
            const armor = await prisma.item.findUnique({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
                },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            if (!armor) {
                throw new Error('Could not find armor');
            }
            return armor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    },
    createOrUpdateArmor: async (formData) => {
        var _a;
        try {
            const armor = await prisma.item.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0, itemType: 'armor' },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (armor && armor.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: armor.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, itemLinkId, itemIds, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "itemLinkId", "itemIds", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, itemIds, actionIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newArmor = await prisma.item.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0, itemType: 'armor' },
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
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemType: 'armor', itemLinkReference: {
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
            return newArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create or update armor');
        }
    },
    deleteArmor: async (armorId) => {
        try {
            await prisma.item.delete({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete armor');
        }
    },
    deleteArmors: async (armorIds) => {
        try {
            await prisma.item.deleteMany({
                where: {
                    id: { in: armorIds },
                    itemType: 'armor',
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete armors');
        }
    },
};
export default armorServices;
