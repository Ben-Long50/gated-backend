import prisma from '../config/database.js';
const itemStatServices = {
    editItemPower: async (itemId, value, userId) => {
        var _a, _b;
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = item === null || item === void 0 ? void 0 : item.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!item) {
                throw new Error('Item not found');
            }
            const statsObject = item.stats;
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
    refreshItemPower: async (itemId, userId) => {
        var _a, _b;
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = item === null || item === void 0 ? void 0 : item.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
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
    editItemStacks: async (itemId, value, userId) => {
        var _a, _b;
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = item === null || item === void 0 ? void 0 : item.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
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
    refreshItemStacks: async (itemId, userId) => {
        var _a, _b;
        try {
            const item = await prisma.item.findUnique({
                where: {
                    id: Number(itemId),
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = item === null || item === void 0 ? void 0 : item.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
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
