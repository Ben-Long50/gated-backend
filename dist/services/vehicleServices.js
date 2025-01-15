var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../config/database.js';
import { getItemWeapons } from '../utils/getAssociatedWeapons.js';
const vehicleServices = {
    getVehicles: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicles = yield prisma.vehicle.findMany({
                orderBy: { name: 'asc' },
                include: { modifications: true },
            });
            return vehicles;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicles');
        }
    }),
    getVehicleMods: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicleMods = yield prisma.modification.findMany({
                orderBy: { name: 'asc' },
            });
            return vehicleMods;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicle modifications');
        }
    }),
    getVehicleById: (vehicleId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicle = yield prisma.vehicle.findUnique({
                where: {
                    id: Number(vehicleId),
                },
                include: { modifications: true },
            });
            if (!vehicle) {
                throw new Error('Could not find vehicle');
            }
            const vehicleDetails = yield getItemWeapons(vehicle);
            return vehicleDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch vehicle');
        }
    }),
    getVehicleModById: (modId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicleMod = yield prisma.modification.findUnique({
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
    }),
    createVehicle: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return JSON.parse(formData.picture);
                }
            };
            const pictureInfo = getPictureInfo();
            const modIds = JSON.parse(formData.modifications).map((modId) => {
                return { id: modId };
            });
            const newVehicle = yield prisma.vehicle.upsert({
                where: { id: Number(JSON.parse(formData.vehicleId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: Number(JSON.parse(formData.price)),
                    description: JSON.parse(formData.description),
                    weapons: JSON.parse(formData.weapons),
                    modifications: { connect: modIds },
                },
                create: {
                    name: JSON.parse(formData.name),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: JSON.parse(formData.price),
                    description: JSON.parse(formData.description),
                    weapons: JSON.parse(formData.weapons),
                    modifications: { connect: modIds },
                },
            });
            return newVehicle;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update vehicle');
        }
    }),
    createVehicleMod: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newVehicleMod = yield prisma.modification.upsert({
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
    }),
    deleteVehicleByName: (vehicleName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.vehicle.delete({
                where: {
                    name: vehicleName,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete vehicle');
        }
    }),
    deleteVehicle: (vehicleId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.vehicle.delete({
                where: {
                    id: Number(vehicleId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete vehicle');
        }
    }),
    deleteVehicleMod: (modId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.modification.delete({
                where: {
                    id: Number(modId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete vehicle modification');
        }
    }),
};
export default vehicleServices;
