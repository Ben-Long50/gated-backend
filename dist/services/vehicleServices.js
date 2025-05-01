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
import { includeVehicleLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
const vehicleServices = {
    getVehicles: async () => {
        try {
            const vehicles = await prisma.vehicle.findMany({
                where: { characterInventoryId: null },
                include: {
                    vehicleLinkReference: { include: includeVehicleLinkReference },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return vehicles;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicles');
        }
    },
    getVehicleById: async (vehicleId) => {
        try {
            const vehicle = await prisma.vehicle.findUnique({
                where: {
                    id: Number(vehicleId),
                },
                include: {
                    vehicleLinkReference: { include: includeVehicleLinkReference },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            if (!vehicle) {
                throw new Error('Could not find vehicle');
            }
            return vehicle;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicle');
        }
    },
    createOrUpdateVehicle: async (formData) => {
        var _a;
        try {
            const vehicle = await prisma.vehicle.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0 },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (vehicle && vehicle.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: vehicle.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, weaponIds, armorIds, actionIds, modificationIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "weaponIds", "armorIds", "actionIds", "modificationIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, weaponIds, armorIds, undefined, actionIds, modificationIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newVehicle = await prisma.vehicle.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), vehicleLinkReference: {
                        upsert: {
                            where: { vehicleId: id !== null && id !== void 0 ? id : 0 },
                            update: {
                                weapons: {
                                    set: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                                },
                                armors: {
                                    set: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
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
                                armors: {
                                    connect: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
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
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), vehicleLinkReference: {
                        create: {
                            weapons: {
                                connect: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                            },
                            armors: {
                                connect: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
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
            return newVehicle;
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(error.message || 'Failed to create or update vehicle');
        }
    },
    createCharacterVehicleCopy: async (inventoryId, vehicleList) => {
        var _a;
        const vehicleIds = vehicleList === null || vehicleList === void 0 ? void 0 : vehicleList.map((vehicle) => vehicle.vehicleId);
        const vehicles = await prisma.vehicle.findMany({
            where: { id: { in: vehicleIds } },
            include: {
                vehicleLinkReference: { include: includeVehicleLinkReference },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { vehicleId, quantity } of vehicleList) {
            const vehicleDetails = vehicles.find((vehicle) => vehicle.id === vehicleId);
            if (!vehicleDetails)
                continue;
            let stats = Object.assign({}, vehicleDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.hull) && !(stats === null || stats === void 0 ? void 0 : stats.currentHull)) {
                stats = Object.assign(Object.assign({}, stats), { currentHull: stats.hull });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.cargo) && !(stats === null || stats === void 0 ? void 0 : stats.currentCargo)) {
                stats = Object.assign(Object.assign({}, stats), { currentCargo: 0 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.hangar) && !(stats === null || stats === void 0 ? void 0 : stats.currentHangar)) {
                stats = Object.assign(Object.assign({}, stats), { currentHangar: 0 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.pass) && !(stats === null || stats === void 0 ? void 0 : stats.currentPass)) {
                stats = Object.assign(Object.assign({}, stats), { currentPass: 0 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.weapon) && !(stats === null || stats === void 0 ? void 0 : stats.currentWeapon)) {
                stats = Object.assign(Object.assign({}, stats), { currentWeapon: (_a = vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.vehicleLinkReference) === null || _a === void 0 ? void 0 : _a.weapons.length });
            }
            const { weaponIds, armorIds, actionIds, modificationIds } = await createLinkedCopies(vehicleDetails.vehicleLinkReference, inventoryId, quantity);
            const keywordIds = (vehicleDetails === null || vehicleDetails === void 0 ? void 0 : vehicleDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = vehicleDetails, rest = __rest(vehicleDetails, ["keywords"]);
            const vehicleData = Object.assign(Object.assign({}, rest), { stats,
                weaponIds,
                armorIds,
                actionIds,
                modificationIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseVehicleId: vehicleDetails.id });
            if (vehicleDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(vehicleServices.createOrUpdateVehicle(vehicleData));
                }
            }
        }
        await Promise.all(promises);
    },
    deleteVehicle: async (vehicleId) => {
        try {
            await prisma.vehicle.delete({
                where: {
                    id: Number(vehicleId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete vehicle');
        }
    },
};
export default vehicleServices;
