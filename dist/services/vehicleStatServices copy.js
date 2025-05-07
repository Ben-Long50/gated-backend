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
            if (statsObject.currentHull + Number(value) < 0) {
                throw new Error("The vehicle's hull is broken");
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentHull: statsObject.currentHull + Number(value) });
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
            if (statsObject.currentCargo + Number(value) < 0) {
                throw new Error('The vehicle cannot go below 0 cargo');
            }
            if (statsObject.currentCargo + Number(value) > statsObject.cargo) {
                throw new Error('The vehicle cannot exceed maximum cargo');
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentCargo: statsObject.currentCargo + Number(value) });
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
            if (statsObject.currentPass + Number(value) < 0) {
                throw new Error('The vehicle cannot go below 0 passengers');
            }
            if (statsObject.currentPass + Number(value) > statsObject.pass) {
                throw new Error('The vehicle cannot exceed maximum passengers');
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPass: statsObject.currentPass + Number(value) });
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
