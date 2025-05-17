import prisma from '../config/database.js';
const armorStatServices = {
    editArmorPower: async (armorId, value, userId) => {
        var _a, _b;
        try {
            const armor = await prisma.item.findUnique({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = armor === null || armor === void 0 ? void 0 : armor.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
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
                    id: Number(armorId),
                    itemType: 'armor',
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
    refreshArmorPower: async (armorId, userId) => {
        var _a, _b;
        try {
            const armor = await prisma.item.findUnique({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = armor === null || armor === void 0 ? void 0 : armor.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentPower: statsObject.power });
            await prisma.item.update({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
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
    editArmorBlock: async (armorId, value, userId) => {
        var _a, _b;
        try {
            const armor = await prisma.item.findUnique({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = armor === null || armor === void 0 ? void 0 : armor.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
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
            const newStats = Object.assign(Object.assign({}, statsObject), { currentBlock: newBlockValue });
            await prisma.item.update({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
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
    refreshArmorBlock: async (armorId, userId) => {
        var _a, _b;
        try {
            const armor = await prisma.item.findUnique({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
                },
                select: {
                    stats: true,
                    characterInventory: {
                        include: { character: { select: { userId: true } } },
                    },
                },
            });
            if (userId !== ((_b = (_a = armor === null || armor === void 0 ? void 0 : armor.characterInventory) === null || _a === void 0 ? void 0 : _a.character) === null || _b === void 0 ? void 0 : _b.userId)) {
                throw new Error('You can only perform this action on a weapon your character owns');
            }
            if (!armor) {
                throw new Error('Armor not found');
            }
            const statsObject = armor.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentBlock: statsObject.block });
            await prisma.item.update({
                where: {
                    id: Number(armorId),
                    itemType: 'armor',
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
