import prisma from '../config/database.js';
const cyberneticStatServices = {
    editCyberneticPower: async (cyberneticId, value, userId) => {
        var _a, _b;
        try {
            const cybernetic = await prisma.cybernetic.findUnique({
                where: {
                    id: Number(cyberneticId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!cybernetic) {
                throw new Error('Armor not found');
            }
            const statsObject = cybernetic.stats;
            if (statsObject.currentPower + Number(value) < 0) {
                throw new Error('Not enough power available');
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: statsObject.currentPower + Number(value) });
            await prisma.cybernetic.update({
                where: {
                    id: Number(cyberneticId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update current power');
        }
    },
    refreshCyberneticPower: async (cyberneticId, userId) => {
        var _a, _b;
        try {
            const cybernetic = await prisma.cybernetic.findUnique({
                where: {
                    id: Number(cyberneticId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!cybernetic) {
                throw new Error('Armor not found');
            }
            const statsObject = cybernetic.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: statsObject.power });
            await prisma.cybernetic.update({
                where: {
                    id: Number(cyberneticId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to refresh cybernetic power');
        }
    },
};
export default cyberneticStatServices;
