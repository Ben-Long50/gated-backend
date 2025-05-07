import prisma from '../config/database.js';
const vehicleStatServices = {
    editVehicleHull: async (vehicleId, value, userId) => {
        var _a, _b;
        try {
            const vehicle = await prisma.vehicle.findUnique({
                where: {
                    id: Number(vehicleId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = vehicle === null || vehicle === void 0 ? void 0 : vehicle.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a vehicle your character owns');
            }
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }
            const statsObject = vehicle.stats;
            let newHullValue;
            if (statsObject.currentHull + Number(value) > statsObject.hull) {
                newHullValue = statsObject.hull;
            }
            else if (statsObject.currentHull + Number(value) < 0) {
                newHullValue = 0;
            }
            else {
                newHullValue = statsObject.currentHull + Number(value);
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentHull: newHullValue });
            await prisma.vehicle.update({
                where: {
                    id: Number(vehicleId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update vehicle hull');
        }
    },
    editVehicleCargo: async (vehicleId, value, userId) => {
        var _a, _b;
        try {
            const vehicle = await prisma.vehicle.findUnique({
                where: {
                    id: Number(vehicleId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = vehicle === null || vehicle === void 0 ? void 0 : vehicle.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a vehicle your character owns');
            }
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }
            const statsObject = vehicle.stats;
            let newCargoValue;
            if (statsObject.currentCargo + Number(value) > statsObject.cargo) {
                newCargoValue = statsObject.cargo;
            }
            else if (statsObject.currentCargo + Number(value) < 0) {
                newCargoValue = 0;
            }
            else {
                newCargoValue = statsObject.currentCargo + Number(value);
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentCargo: newCargoValue });
            await prisma.vehicle.update({
                where: {
                    id: Number(vehicleId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update vehicle cargo');
        }
    },
    editVehiclePass: async (vehicleId, value, userId) => {
        var _a, _b;
        try {
            const vehicle = await prisma.vehicle.findUnique({
                where: {
                    id: Number(vehicleId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = vehicle === null || vehicle === void 0 ? void 0 : vehicle.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a vehicle your character owns');
            }
            if (!vehicle) {
                throw new Error('Vehicle not found');
            }
            const statsObject = vehicle.stats;
            let newPassValue;
            if (statsObject.currentPass + Number(value) > statsObject.pass) {
                newPassValue = statsObject.pass;
            }
            else if (statsObject.currentPass + Number(value) < 0) {
                newPassValue = 0;
            }
            else {
                newPassValue = statsObject.currentPass + Number(value);
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPass: newPassValue });
            await prisma.vehicle.update({
                where: {
                    id: Number(vehicleId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update vehicle passengers');
        }
    },
};
export default vehicleStatServices;
