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
const modificationServices = {
    getModifications: async () => {
        try {
            const modificiations = await prisma.modification.findMany({
                where: { characterInventoryId: null },
                include: {
                    modificationLinkReference: {
                        include: { actions: { orderBy: { name: 'asc' } } },
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return modificiations;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch modifications');
        }
    },
    getModificationById: async (modId) => {
        try {
            const modification = await prisma.modification.findUnique({
                where: {
                    id: Number(modId),
                },
                include: {
                    modificationLinkReference: {
                        include: { actions: { orderBy: { name: 'asc' } } },
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            return modification;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch modification');
        }
    },
    createOrUpdateModification: async (formData) => {
        var _a;
        try {
            const modification = await prisma.modification.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0 },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (modification && modification.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: modification.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, vehicleLinkId, droneLinkId, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "vehicleLinkId", "droneLinkId", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, undefined, undefined, undefined, actionIds, undefined);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newModification = await prisma.modification.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), modificationLinkReference: {
                        upsert: {
                            where: { modificationId: id !== null && id !== void 0 ? id : 0 },
                            update: {
                                actions: {
                                    set: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                            create: {
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
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), modificationLinkReference: {
                        create: {
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
            return newModification;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update modification');
        }
    },
    createCharacterModificationCopy: async (inventoryId, modificationList) => {
        const modificationIds = modificationList === null || modificationList === void 0 ? void 0 : modificationList.map((modification) => modification.modificationId);
        const modifications = await prisma.modification.findMany({
            where: { id: { in: modificationIds } },
            include: {
                modificationLinkReference: { include: { actions: true } },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { modificationId, quantity } of modificationList) {
            const modificationDetails = modifications.find((modification) => modification.id === modificationId);
            if (!modificationDetails)
                continue;
            let stats = Object.assign({}, modificationDetails.stats);
            const { actionIds } = await createLinkedCopies(modificationDetails.modificationLinkReference, inventoryId, quantity);
            const keywordIds = (modificationDetails === null || modificationDetails === void 0 ? void 0 : modificationDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = modificationDetails, rest = __rest(modificationDetails, ["keywords"]);
            const modificationData = Object.assign(Object.assign({}, rest), { stats,
                actionIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseModificationId: modificationDetails.id });
            if (modificationDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(modificationServices.createOrUpdateModification(modificationData));
                }
            }
        }
        const newModifications = await Promise.all(promises);
        return newModifications
            .filter((modification) => modification !== undefined)
            .map((modification) => modification.id);
    },
    deleteModification: async (modificationId) => {
        try {
            await prisma.modification.delete({
                where: {
                    id: Number(modificationId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete modification');
        }
    },
};
export default modificationServices;
