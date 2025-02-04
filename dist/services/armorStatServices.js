import prisma from '../config/database.js';
const armorStatServices = {
    editArmorPower: async (armorId, value) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
                select: { stats: true },
            });
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
            if (statsObject.currentPower + Number(value) < 0) {
                throw new Error('Not enough power available');
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: statsObject.currentPower + Number(value) });
            await prisma.armor.update({
                where: {
                    id: Number(armorId),
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
    refreshArmorPower: async (armorId) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
                select: { stats: true },
            });
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: statsObject.power });
            await prisma.armor.update({
                where: {
                    id: Number(armorId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to refresh armor power');
        }
    },
    editArmorBlock: async (armorId, value) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
                select: { stats: true },
            });
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
            if (statsObject.currentBlock + Number(value) < 0) {
                throw new Error('Not enough block points available');
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentBlock: statsObject.currentBlock + Number(value) });
            await prisma.armor.update({
                where: {
                    id: Number(armorId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update current block points');
        }
    },
    refreshArmorBlock: async (armorId) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
                select: { stats: true },
            });
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentBlock: statsObject.block });
            await prisma.armor.update({
                where: {
                    id: Number(armorId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to refresh armor block points');
        }
    },
};
export default armorStatServices;
