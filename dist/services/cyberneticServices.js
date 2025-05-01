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
import { includeCyberneticLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
const cyberneticServices = {
    getCybernetics: async () => {
        try {
            const cybernetics = await prisma.cybernetic.findMany({
                where: { characterInventoryId: null },
                include: {
                    cyberneticLinkReference: {
                        include: includeCyberneticLinkReference,
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return cybernetics;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetics');
        }
    },
    getCyberneticById: async (cyberneticId) => {
        try {
            const cybernetic = await prisma.cybernetic.findUnique({
                where: {
                    id: Number(cyberneticId),
                },
                include: {
                    cyberneticLinkReference: {
                        include: includeCyberneticLinkReference,
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            if (!cybernetic) {
                throw new Error('Could not find cybernetic');
            }
            return cybernetic;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetic');
        }
    },
    createOrUpdateCybernetic: async (formData) => {
        var _a;
        try {
            const cybernetic = await prisma.cybernetic.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0 },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (cybernetic && cybernetic.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: cybernetic.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, weaponLinkId, armorLinkId, cyberneticLinkId, weaponIds, armorIds, cyberneticIds, actionIds, modifiers, keywordIds, stats, cyberneticType, characterInventoryId } = formData, data = __rest(formData, ["id", "weaponLinkId", "armorLinkId", "cyberneticLinkId", "weaponIds", "armorIds", "cyberneticIds", "actionIds", "modifiers", "keywordIds", "stats", "cyberneticType", "characterInventoryId"]);
            await enforceSingularLinking(id, weaponIds, armorIds, cyberneticIds, actionIds, undefined);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newCybernetic = await prisma.cybernetic.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0 },
                update: Object.assign(Object.assign({}, data), { cyberneticType: cyberneticType, stats: Object.assign({}, stats), cyberneticLinkReference: {
                        upsert: {
                            where: { cyberneticId: id !== null && id !== void 0 ? id : 0 },
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
                create: Object.assign(Object.assign({}, data), { cyberneticType: cyberneticType, stats: Object.assign({}, stats), cyberneticLinkReference: {
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
            return newCybernetic;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create cybernetic');
        }
    },
    createCharacterCyberneticCopy: async (inventoryId, cyberneticList) => {
        const cyberneticIds = cyberneticList === null || cyberneticList === void 0 ? void 0 : cyberneticList.map((cybernetic) => cybernetic.cyberneticId);
        const cybernetics = await prisma.cybernetic.findMany({
            where: { id: { in: cyberneticIds } },
            include: {
                cyberneticLinkReference: { include: includeCyberneticLinkReference },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { cyberneticId, quantity } of cyberneticList) {
            const cyberneticDetails = cybernetics.find((cybernetic) => cybernetic.id === cyberneticId);
            if (!cyberneticDetails)
                continue;
            let stats = Object.assign({}, cyberneticDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
                stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
            }
            const { weaponIds, armorIds, cyberneticIds, actionIds } = await createLinkedCopies(cyberneticDetails.cyberneticLinkReference, inventoryId, quantity);
            const keywordIds = (cyberneticDetails === null || cyberneticDetails === void 0 ? void 0 : cyberneticDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = cyberneticDetails, rest = __rest(cyberneticDetails, ["keywords"]);
            const cyberneticData = Object.assign(Object.assign({}, rest), { stats,
                weaponIds,
                armorIds,
                cyberneticIds,
                actionIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseCyberneticId: cyberneticDetails.id });
            if (cyberneticDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(cyberneticServices.createOrUpdateCybernetic(cyberneticData));
                }
            }
        }
        const newCybernetics = await Promise.all(promises);
        return newCybernetics
            .filter((cybernetic) => cybernetic !== undefined)
            .map((cybernetic) => cybernetic.id);
    },
    deleteCybernetic: async (cyberneticId) => {
        try {
            await prisma.cybernetic.delete({
                where: {
                    id: Number(cyberneticId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete cybernetic');
        }
    },
};
export default cyberneticServices;
