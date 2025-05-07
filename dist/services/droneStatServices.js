import prisma from '../config/database.js';
const droneStatServices = {
    editDroneHull: async (droneId, value, userId) => {
        var _a, _b;
        try {
            const drone = await prisma.drone.findUnique({
                where: {
                    id: Number(droneId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = drone === null || drone === void 0 ? void 0 : drone.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a drone your character owns');
            }
            if (!drone) {
                throw new Error('Drone not found');
            }
            const statsObject = drone.stats;
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
            await prisma.drone.update({
                where: {
                    id: Number(droneId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update drone hull');
        }
    },
    editDronePower: async (droneId, value, userId) => {
        var _a, _b;
        try {
            const drone = await prisma.drone.findUnique({
                where: {
                    id: Number(droneId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = drone === null || drone === void 0 ? void 0 : drone.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a drone your character owns');
            }
            if (!drone) {
                throw new Error('Drone not found');
            }
            const statsObject = drone.stats;
            let newPowerValue;
            if (statsObject.currentPower + Number(value) > statsObject.power) {
                newPowerValue = statsObject.power;
            }
            else if (statsObject.currentPower + Number(value) < 0) {
                newPowerValue = 0;
            }
            else {
                newPowerValue = statsObject.currentPower + Number(value);
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: newPowerValue });
            await prisma.drone.update({
                where: {
                    id: Number(droneId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update drone power');
        }
    },
};
export default droneStatServices;
