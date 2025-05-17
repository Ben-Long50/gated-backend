import prisma from '../config/database.js';
const cyberneticStatServices = {
    editCyberneticPower: async (cyberneticId, value, userId) => {
        var _a, _b;
        try {
            const cybernetic = await prisma.item.findUnique({
                where: {
                    id: Number(cyberneticId),
                    itemType: 'augmentation',
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a cybernetic your character owns');
            }
            if (!cybernetic) {
                throw new Error('Cybernetic not found');
            }
            const statsObject = cybernetic.stats;
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
            await prisma.item.update({
                where: {
                    id: Number(cyberneticId),
                    itemType: 'augmentation',
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
            const cybernetic = await prisma.item.findUnique({
                where: {
                    id: Number(cyberneticId),
                    itemType: 'augmentation',
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
            await prisma.item.update({
                where: {
                    id: Number(cyberneticId),
                    itemType: 'augmentation',
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
