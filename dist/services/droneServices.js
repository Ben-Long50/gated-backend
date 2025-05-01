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
import { includeDroneLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
const droneServices = {
    getDrones: async () => {
        try {
            const drones = await prisma.drone.findMany({
                where: { characterInventoryId: null },
                include: {
                    droneLinkReference: { include: includeDroneLinkReference },
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
            const drone = await prisma.drone.findUnique({
                where: {
                    id: Number(droneId),
                },
                include: {
                    droneLinkReference: { include: includeDroneLinkReference },
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
            const drone = await prisma.drone.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0 },
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
            const { id, weaponIds, actionIds, modificationIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "weaponIds", "actionIds", "modificationIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, weaponIds, undefined, undefined, actionIds, modificationIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newDrone = await prisma.drone.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), droneLinkReference: {
                        upsert: {
                            where: { droneId: id !== null && id !== void 0 ? id : 0 },
                            update: {
                                weapons: {
                                    set: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                                },
                                actions: {
                                    set: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                                modifications: {
                                    set: modificationIds === null || modificationIds === void 0 ? void 0 : modificationIds.map((id) => ({ id })),
                                },
                            },
                            create: {
                                weapons: {
                                    connect: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                                },
                                actions: {
                                    connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                                modifications: {
                                    connect: modificationIds === null || modificationIds === void 0 ? void 0 : modificationIds.map((id) => ({ id })),
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
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), droneLinkReference: {
                        create: {
                            weapons: {
                                connect: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                            },
                            actions: {
                                connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                            },
                            modifications: {
                                connect: modificationIds === null || modificationIds === void 0 ? void 0 : modificationIds.map((id) => ({ id })),
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
    createCharacterDroneCopy: async (inventoryId, droneList) => {
        const droneIds = droneList === null || droneList === void 0 ? void 0 : droneList.map((drone) => drone.droneId);
        const drones = await prisma.drone.findMany({
            where: { id: { in: droneIds } },
            include: {
                droneLinkReference: { include: includeDroneLinkReference },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { droneId, quantity } of droneList) {
            const droneDetails = drones.find((drone) => drone.id === droneId);
            if (!droneDetails)
                continue;
            let stats = Object.assign({}, droneDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.health) && !(stats === null || stats === void 0 ? void 0 : stats.currentHealth)) {
                stats = Object.assign(Object.assign({}, stats), { currentHealth: stats.health });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            const { weaponIds, actionIds, modificationIds } = await createLinkedCopies(droneDetails.droneLinkReference, inventoryId, quantity);
            const keywordIds = (droneDetails === null || droneDetails === void 0 ? void 0 : droneDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = droneDetails, rest = __rest(droneDetails, ["keywords"]);
            const droneData = Object.assign(Object.assign({}, rest), { stats,
                weaponIds,
                actionIds,
                modificationIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseDroneId: droneDetails.id });
            if (droneDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(droneServices.createOrUpdateDrone(droneData));
                }
            }
        }
        await Promise.all(promises);
    },
    deleteDrone: async (droneId) => {
        try {
            await prisma.drone.delete({
                where: {
                    id: Number(droneId),
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
