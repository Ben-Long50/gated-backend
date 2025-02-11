import prisma from '../config/database.js';
const itemStatServices = {
    editItemPower: async (itemId, value) => {
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: { stats: true },
            });
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = item.stats;
            if (statsObject.currentPower + Number(value) < 0) {
                throw new Error('Not enough power available');
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: statsObject.currentPower + Number(value) });
            await prisma.item.update({
                where: {
                    id: Number(itemId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update item power');
        }
    },
    refreshItemPower: async (itemId) => {
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: { stats: true },
            });
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = item.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: statsObject.power });
            await prisma.item.update({
                where: {
                    id: Number(itemId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to refresh item power');
        }
    },
    editItemStacks: async (itemId, value) => {
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: { stats: true },
            });
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = item.stats;
            if (statsObject.currentStacks + Number(value) < 0) {
                throw new Error('Not enough stacks available');
            }
            const newStats = Object.assign(Object.assign({}, statsObject), { currentStacks: statsObject.currentStacks + Number(value) });
            await prisma.item.update({
                where: {
                    id: Number(itemId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update item stacks');
        }
    },
    refreshItemStacks: async (itemId) => {
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: { stats: true },
            });
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = item.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentStacks: statsObject.maxStacks });
            await prisma.item.update({
                where: {
                    id: Number(itemId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to refresh item stacks');
        }
    },
};
export default itemStatServices;
