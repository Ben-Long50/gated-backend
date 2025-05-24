import prisma from '../config/database.js';
import getStatsObject from '../utils/getStatsObject.js';
const itemStatServices = {
    editItemBlock: async (itemId, value, userId) => {
        var _a, _b;
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: {
                    stats: true,
                    modifiedStats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = item === null || item === void 0 ? void 0 : item.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!item) {
                throw new Error('Armor not found');
            }
            const statsObject = getStatsObject(item);
            let newBlockValue;
            if (statsObject.currentBlock + Number(value) > statsObject.block) {
                newBlockValue = statsObject.block;
            }
            else if (statsObject.currentBlock + Number(value) < 0) {
                newBlockValue = 0;
            }
            else {
                newBlockValue = statsObject.currentBlock + Number(value);
            }
            const newStats = typeof item.stats === 'object'
                ? Object.assign(Object.assign({}, item.stats), { currentBlock: newBlockValue }) : {};
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
            throw new Error('Failed to update current block points');
        }
    },
    refreshItemBlock: async (itemId, userId) => {
        var _a, _b;
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: {
                    stats: true,
                    modifiedStats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = item === null || item === void 0 ? void 0 : item.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!item) {
                throw new Error('Armor not found');
            }
            const statsObject = getStatsObject(item);
            const newStats = typeof item.stats === 'object'
                ? Object.assign(Object.assign({}, item.stats), { currentBlock: statsObject.block }) : {};
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
            throw new Error('Failed to refresh item block points');
        }
    },
};
export default itemStatServices;
