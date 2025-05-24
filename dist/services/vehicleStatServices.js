import prisma from '../config/database.js';
import getStatsObject from '../utils/getStatsObject.js';
const itemStatServices = {
    editItemHull: async (itemId, value, userId) => {
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
                throw new Error('You can only perform this action on a item your character owns');
            }
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = getStatsObject(item);
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
            const newStats = typeof item.stats === 'object'
                ? Object.assign(Object.assign({}, item.stats), { currentHull: newHullValue }) : {};
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
            throw new Error('Failed to update item hull');
        }
    },
    editItemCargo: async (itemId, value, userId) => {
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
                throw new Error('You can only perform this action on a item your character owns');
            }
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = getStatsObject(item);
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
            const newStats = typeof item.stats === 'object'
                ? Object.assign(Object.assign({}, item.stats), { currentCargo: newCargoValue }) : {};
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
            throw new Error('Failed to update item cargo');
        }
    },
    editItemPass: async (itemId, value, userId) => {
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
                throw new Error('You can only perform this action on a item your character owns');
            }
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = getStatsObject(item);
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
            const newStats = typeof item.stats === 'object'
                ? Object.assign(Object.assign({}, item.stats), { currentPass: newPassValue }) : {};
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
            throw new Error('Failed to update item passengers');
        }
    },
};
export default itemStatServices;
