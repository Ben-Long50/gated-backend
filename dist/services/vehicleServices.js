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
            // const vehicleDetails = await getItemWeapons(vehicle);
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
    createVehicle: async (formData) => {
        try {
            const oldVehicle = (await prisma.vehicle.findUnique({
                where: { id: Number(JSON.parse(formData.vehicleId)) },
                include: {
                    weapons: { select: { id: true } },
                    modifications: { select: { id: true } },
                },
            })) || null;
            const oldWeaponIds = (oldVehicle === null || oldVehicle === void 0 ? void 0 : oldVehicle.weapons.filter(({ id }) => !JSON.parse(formData.weapons).includes(id)).map(({ id }) => id)) || [];
            if (oldWeaponIds && oldWeaponIds.length > 0) {
                await prisma.weapon.deleteMany({
                    where: { id: { in: oldWeaponIds }, characterInventoryId: null },
                });
            }
            const newWeaponIds = JSON.parse(formData.weapons).filter((id) => !(oldVehicle === null || oldVehicle === void 0 ? void 0 : oldVehicle.weapons.some((weapon) => weapon.id === id)));
            console.log(newWeaponIds);
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return JSON.parse(formData.picture);
                }
            };
            const pictureInfo = getPictureInfo();
            const weapons = await prisma.weapon.findMany({
                where: { id: { in: newWeaponIds } },
            });
            const weaponData = weapons.map((_a) => {
                var { id, vehicleId, cyberneticId } = _a, rest = __rest(_a, ["id", "vehicleId", "cyberneticId"]);
                return (Object.assign(Object.assign({}, rest), { picture: rest.picture
                        ? rest.picture
                        : undefined, stats: rest.stats
                        ? rest.stats
                        : Prisma.JsonNull, keywords: rest.keywords
                        ? rest.keywords
                        : undefined }));
            });
            const mods = await prisma.modification.findMany({
                where: { id: { in: JSON.parse(formData.modifications) } },
            });
            const modData = mods.map((_a) => {
                var { id, vehicleId } = _a, rest = __rest(_a, ["id", "vehicleId"]);
                return (Object.assign({}, rest));
            });
            const newVehicle = await prisma.vehicle.upsert({
                where: { id: Number(JSON.parse(formData.vehicleId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
                    rarity: JSON.parse(formData.rarity),
                    grade: Number(JSON.parse(formData.grade)),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: Number(JSON.parse(formData.price)),
                    description: JSON.parse(formData.description),
                    weapons: { create: weaponData },
                    modifications: { create: modData },
                },
                create: {
                    name: JSON.parse(formData.name),
                    rarity: JSON.parse(formData.rarity),
                    grade: Number(JSON.parse(formData.grade)),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: JSON.parse(formData.price),
                    description: JSON.parse(formData.description),
                    weapons: { create: weaponData },
                    modifications: { create: modData },
                },
            });
            return newVehicle;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update vehicle');
        }
    },
    createVehicleMod: async (formData) => {
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
            console.log(deletedVehicle);
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
