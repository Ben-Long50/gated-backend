var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import prisma from '../config/database.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { includeArmorLinkReference } from '../utils/linkQueryStructures.js';
const armorServices = {
    getArmor: async () => {
        try {
            const armor = await prisma.armor.findMany({
                where: { characterInventoryId: null },
                include: {
                    armorLinkReference: { include: includeArmorLinkReference },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return armor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    },
    getArmorById: async (armorId) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
                include: {
                    armorLinkReference: { include: includeArmorLinkReference },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            if (!armor) {
                throw new Error('Could not find armor');
            }
            return armor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    },
    createOrUpdateArmor: async (formData) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: { id: formData.id },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (armor && armor.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: armor.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, weaponLinkId, armorLinkId, cyberneticLinkId, vehicleLinkId, weaponIds, armorIds, cyberneticIds, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "weaponLinkId", "armorLinkId", "cyberneticLinkId", "vehicleLinkId", "weaponIds", "armorIds", "cyberneticIds", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, weaponIds, armorIds, cyberneticIds, actionIds, undefined);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newArmor = await prisma.armor.upsert({
                where: { id },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), armorLinkReference: {
                        upsert: {
                            where: { armorId: formData.id },
                            update: {
                                weapons: {
                                    set: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                                },
                                armors: {
                                    set: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
                                },
                                actions: {
                                    set: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                            create: {
                                weapons: {
                                    connect: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                                },
                                armors: {
                                    connect: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
                                },
                                actions: {
                                    connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                        },
                    }, keywords: { createMany: { data: keywordData } }, characterInventory: characterInventoryId
                        ? {
                            connect: {
                                id: characterInventoryId,
                            },
                        }
                        : undefined }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), armorLinkReference: {
                        create: {
                            weapons: {
                                connect: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                            },
                            armors: {
                                connect: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
                            },
                            actions: {
                                connect: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                            },
                        },
                    }, keywords: { createMany: { data: keywordData } }, characterInventory: characterInventoryId
                        ? {
                            connect: {
                                id: characterInventoryId,
                            },
                        }
                        : undefined }),
            });
            return newArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create or update armor');
        }
    },
    createCharacterArmorCopy: async (inventoryId, armorList) => {
        const armorIds = armorList === null || armorList === void 0 ? void 0 : armorList.map((armor) => armor.armorId);
        const armor = await prisma.armor.findMany({
            where: { id: { in: armorIds } },
            include: {
                armorLinkReference: { include: includeArmorLinkReference },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { armorId, quantity } of armorList) {
            const armorDetails = armor.find((armor) => armor.id === armorId);
            if (!armorDetails)
                continue;
            let stats = Object.assign({}, armorDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.block) && !(stats === null || stats === void 0 ? void 0 : stats.currentBlock)) {
                stats = Object.assign(Object.assign({}, stats), { currentBlock: stats.block });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            const { weaponIds, armorIds, cyberneticIds, actionIds } = await createLinkedCopies(armorDetails.armorLinkReference, inventoryId, quantity);
            const keywordIds = (armorDetails === null || armorDetails === void 0 ? void 0 : armorDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = armorDetails, rest = __rest(armorDetails, ["keywords"]);
            const armorData = Object.assign(Object.assign({}, rest), { stats,
                weaponIds,
                armorIds,
                cyberneticIds,
                actionIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseArmorId: armorDetails.id });
            if (armorDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(armorServices.createOrUpdateArmor(armorData));
                }
            }
        }
        const newArmor = await Promise.all(promises);
        return newArmor
            .filter((armor) => armor !== undefined)
            .map((armor) => armor.id);
    },
    deleteArmor: async (armorId) => {
        try {
            await prisma.armor.delete({
                where: {
                    id: Number(armorId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete armor');
        }
    },
    deleteArmors: async (armorIds) => {
        try {
            await prisma.armor.deleteMany({
                where: {
                    id: { in: armorIds },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete armors');
        }
    },
};
export default armorServices;
