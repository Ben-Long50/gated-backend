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
const droneServices = {
    getDrones: async () => {
        try {
            const drones = await prisma.item.findMany({
                where: { itemType: 'drone', characterInventoryId: null },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return drones;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch drones');
        }
    },
    getDroneById: async (droneId) => {
        try {
            const drone = await prisma.item.findUnique({
                where: {
                    id: Number(droneId),
                    itemType: 'drone',
                },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            return drone;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch drone');
        }
    },
    createOrUpdateDrone: async (formData) => {
        var _a;
        try {
            const drone = await prisma.item.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0, itemType: 'drone' },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (drone && drone.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: drone.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, itemLinkId, itemIds, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "itemLinkId", "itemIds", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, itemIds, actionIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newDrone = await prisma.item.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0, itemType: 'drone' },
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
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemType: 'drone', itemLinkReference: {
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
            return newDrone;
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(error.message || 'Failed to create or update drone');
        }
    },
    deleteDrone: async (droneId) => {
        try {
            await prisma.item.delete({
                where: {
                    id: Number(droneId),
                    itemType: 'drone',
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete drone');
        }
    },
};
export default droneServices;
