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
import { Prisma } from '@prisma/client';
import prisma from '../config/database.js';
const vehicleServices = {
    getVehicles: async () => {
        try {
            const vehicles = await prisma.vehicle.findMany({
                where: { characterInventoryId: null },
                orderBy: { name: 'asc' },
                include: { weapons: true, modifications: true },
            });
            return vehicles;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicles');
        }
    },
    getVehicleMods: async () => {
        try {
            const vehicleMods = await prisma.modification.findMany({
                where: { characterInventoryId: null, vehicleId: null },
                orderBy: { name: 'asc' },
            });
            return vehicleMods;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicle modifications');
        }
    },
    getVehicleById: async (vehicleId) => {
        try {
            const vehicle = await prisma.vehicle.findUnique({
                where: {
                    id: Number(vehicleId),
                },
                include: { weapons: true, modifications: true },
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
    getVehicleModById: async (modId) => {
        try {
            const vehicleMod = await prisma.modification.findUnique({
                where: {
                    id: Number(modId),
                },
            });
            return vehicleMod;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicle');
        }
    },
    createOrUpdateVehicle: async (formData) => {
        try {
            if (formData.stats.weapon
                ? formData.weapons.length > formData.stats.weapon
                : formData.weapons.length > 0) {
                throw new Error('Your vehicle does not have enough weapon slots to support the chosen weapons');
            }
            const oldVehicle = (await prisma.vehicle.findUnique({
                where: { id: Number(formData.vehicleId) },
                include: {
                    weapons: { select: { id: true } },
                    modifications: { select: { id: true } },
                },
            })) || null;
            const previousWeaponIds = oldVehicle
                ? oldVehicle.weapons.map((item) => item.id)
                : [];
            const previousModIds = oldVehicle
                ? oldVehicle.modifications.map((item) => item.id)
                : [];
            const weaponData = await vehicleServices.swapWeapons(formData.weapons, previousWeaponIds);
            const modData = await vehicleServices.swapMods(formData.modifications, previousModIds);
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return formData.picture;
                }
            };
            const pictureInfo = getPictureInfo();
            const newVehicle = await prisma.vehicle.upsert({
                where: { id: Number(formData.vehicleId) || 0 },
                update: {
                    name: formData.name,
                    rarity: formData.rarity,
                    grade: formData.grade,
                    picture: pictureInfo,
                    stats: formData.stats,
                    price: formData.price,
                    description: formData.description,
                    weapons: {
                        create: weaponData.data,
                        connect: weaponData.newOwnedIds.map((id) => ({ id })),
                        disconnect: weaponData.oldIds.map((id) => ({ id })),
                    },
                    modifications: {
                        create: modData.data,
                        connect: modData.newOwnedIds.map((id) => ({ id })),
                        disconnect: modData.oldIds.map((id) => ({ id })),
                    },
                },
                create: {
                    name: formData.name,
                    rarity: formData.rarity,
                    grade: formData.grade,
                    picture: pictureInfo,
                    stats: formData.stats,
                    price: formData.price,
                    description: formData.description,
                    weapons: { create: weaponData.data },
                    modifications: { create: modData.data },
                },
            });
            return newVehicle;
        }
        catch (error) {
            console.error(error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Failed to create or update vehicle');
        }
    },
    swapWeapons: async (newWeaponIds, previousWeaponIds) => {
        const oldIds = previousWeaponIds.filter((id) => !newWeaponIds.includes(id)) || [];
        await prisma.weapon.deleteMany({
            where: { id: { in: oldIds }, characterInventoryId: null },
        });
        const newIds = newWeaponIds.filter((id) => !previousWeaponIds.some((item) => item === id));
        const weapons = await prisma.weapon.findMany({
            where: { id: { in: newIds }, characterInventoryId: null },
        });
        const newOwnedIds = newIds.filter((id) => !weapons.map((weapon) => weapon.id).includes(id));
        const data = weapons.map((_a) => {
            var { id, vehicleId, cyberneticId } = _a, rest = __rest(_a, ["id", "vehicleId", "cyberneticId"]);
            return (Object.assign(Object.assign({}, rest), { picture: rest.picture
                    ? rest.picture
                    : undefined, stats: rest.stats
                    ? rest.stats
                    : Prisma.JsonNull, keywords: rest.keywords
                    ? rest.keywords
                    : undefined }));
        });
        return {
            oldIds,
            newOwnedIds,
            data,
        };
    },
    swapMods: async (newModIds, previousModIds) => {
        const oldIds = previousModIds.filter((id) => !newModIds.includes(id)) || [];
        await prisma.modification.deleteMany({
            where: { id: { in: oldIds }, characterInventoryId: null },
        });
        const newIds = newModIds.filter((id) => !previousModIds.some((item) => item === id));
        const modifications = await prisma.modification.findMany({
            where: { id: { in: newIds }, characterInventoryId: null },
        });
        const newOwnedIds = newIds.filter((id) => !modifications.map((mod) => mod.id).includes(id));
        const data = modifications.map((_a) => {
            var { id, vehicleId } = _a, rest = __rest(_a, ["id", "vehicleId"]);
            return (Object.assign({}, rest));
        });
        return {
            oldIds,
            newOwnedIds,
            data,
        };
    },
    createOrUpdateVehicleMod: async (formData) => {
        try {
            const newVehicleMod = await prisma.modification.upsert({
                where: { id: Number(formData.modId) || 0 },
                update: {
                    name: formData.name,
                    price: Number(formData.price),
                    modificationType: formData.modificationType,
                    description: formData.description,
                },
                create: {
                    name: formData.name,
                    price: Number(formData.price),
                    modificationType: formData.modificationType,
                    description: formData.description,
                },
            });
            return newVehicleMod;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update vehicle modification');
        }
    },
    deleteVehicle: async (vehicleId) => {
        var _a;
        try {
            const deletedVehicle = await prisma.vehicle.delete({
                where: {
                    id: Number(vehicleId),
                },
                include: { weapons: { select: { id: true } } },
            });
            if (deletedVehicle.characterInventoryId === null) {
                await prisma.weapon.deleteMany({
                    where: {
                        id: { in: (_a = deletedVehicle.weapons) === null || _a === void 0 ? void 0 : _a.map((weapon) => weapon.id) },
                    },
                });
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete vehicle');
        }
    },
    deleteVehicleMod: async (modId) => {
        try {
            await prisma.modification.delete({
                where: {
                    id: Number(modId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete vehicle modification');
        }
    },
};
export default vehicleServices;
