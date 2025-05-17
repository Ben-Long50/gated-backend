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
import addVariableStats from '../utils/addVariableStats.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import weaponServices from './weaponServices.js';
import armorServices from './armorServices.js';
import cyberneticServices from './cyberneticServices.js';
import vehicleServices from './vehicleServices.js';
import droneServices from './droneServices.js';
import modificationServices from './modificationServices.js';
const itemServices = {
    getItems: async () => {
        try {
            const miscTypes = ['consumable', 'reusable'];
            const items = await prisma.item.findMany({
                where: { itemType: { in: miscTypes }, characterInventory: null },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return items;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch items');
        }
    },
    getItemById: async (itemId) => {
        try {
            const miscTypes = ['consumable', 'reusable'];
            const item = await prisma.item.findUnique({
                where: { id: Number(itemId), itemType: { in: miscTypes } },
                include: {
                    itemLinkReference: { include: { items: true, actions: true } },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            return item;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch item');
        }
    },
    createOrUpdateItem: async (formData) => {
        var _a;
        const miscTypes = ['consumable', 'reusable'];
        try {
            const item = await prisma.item.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0, itemType: { in: miscTypes } },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (item && item.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: item.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, itemLinkId, itemIds, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "itemLinkId", "itemIds", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, itemIds, actionIds);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newItem = await prisma.item.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0, itemType: { in: miscTypes } },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemLinkReference: {
                        upsert: {
                            where: { itemId: id !== null && id !== void 0 ? id : 0 },
                            update: {
                                items: {
                                    set: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
                                },
                                actions: {
                                    set: actionIds === null || actionIds === void 0 ? void 0 : actionIds.map((id) => ({ id })),
                                },
                            },
                            create: {
                                items: {
                                    connect: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
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
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), itemType: 'reusable', itemLinkReference: {
                        create: {
                            items: {
                                connect: itemIds === null || itemIds === void 0 ? void 0 : itemIds.map((id) => ({ id })),
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
            return newItem;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update item');
        }
    },
    createCharacterItemCopy: async (inventoryId, itemList) => {
        const itemIds = itemList === null || itemList === void 0 ? void 0 : itemList.map((item) => item.itemId);
        const items = await prisma.item.findMany({
            where: { id: { in: itemIds } },
            include: {
                itemLinkReference: { include: { items: true, actions: true } },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { itemId, quantity } of itemList) {
            const itemDetails = items.find((item) => item.id === itemId);
            if (!itemDetails)
                continue;
            const stats = itemDetails.stats
                ? addVariableStats(Object.assign({}, itemDetails.stats))
                : null;
            const { itemIds, actionIds } = await createLinkedCopies(itemDetails.itemLinkReference, inventoryId, quantity);
            const keywordIds = (itemDetails === null || itemDetails === void 0 ? void 0 : itemDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = itemDetails, rest = __rest(itemDetails, ["keywords"]);
            const itemData = Object.assign(Object.assign({}, rest), { stats,
                itemIds,
                actionIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseItemId: itemDetails.id });
            if (itemDetails) {
                for (let i = 0; i < quantity; i++) {
                    switch (itemData.itemType) {
                        case 'weapon':
                            promises.push(weaponServices.createOrUpdateWeapon(itemData));
                            break;
                        case 'armor':
                            promises.push(armorServices.createOrUpdateArmor(itemData));
                            break;
                        case 'cybernetic':
                            promises.push(cyberneticServices.createOrUpdateCybernetic(itemData));
                            break;
                        case 'vehicle':
                            promises.push(vehicleServices.createOrUpdateVehicle(itemData));
                            break;
                        case 'drone':
                            promises.push(droneServices.createOrUpdateDrone(itemData));
                            break;
                        case 'modification':
                            promises.push(modificationServices.createOrUpdateModification(itemData));
                            break;
                        default:
                            promises.push(itemServices.createOrUpdateItem(itemData));
                            break;
                    }
                }
            }
        }
        const newItems = await Promise.all(promises);
        return newItems.filter((item) => item !== undefined).map((item) => item.id);
    },
    deleteItem: async (itemId) => {
        try {
            const miscTypes = ['consumable', 'reusable'];
            await prisma.item.delete({
                where: {
                    id: Number(itemId),
                    itemType: { in: miscTypes },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete item');
        }
    },
    deleteItems: async (itemIds) => {
        try {
            const miscTypes = ['consumable', 'reusable'];
            await prisma.item.deleteMany({
                where: {
                    id: { in: itemIds },
                    itemType: { in: miscTypes },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete items');
        }
    },
};
export default itemServices;
