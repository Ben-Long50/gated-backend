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
import { includeWeaponLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
const weaponServices = {
    getWeapons: async () => {
        try {
            const weapons = await prisma.weapon.findMany({
                where: {
                    characterInventoryId: null,
                    // weaponLinkId: null,
                    armorLinkId: null,
                    cyberneticLinkId: null,
                    vehicleLinkId: null,
                },
                include: {
                    weaponLinkReference: { include: includeWeaponLinkReference },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
                orderBy: { name: 'asc' },
            });
            return weapons;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch weapons');
        }
    },
    getWeaponById: async (weaponId) => {
        try {
            const weapon = await prisma.weapon.findUnique({
                where: {
                    id: Number(weaponId),
                },
                include: {
                    weaponLinkReference: {
                        include: includeWeaponLinkReference,
                    },
                    keywords: {
                        include: { keyword: true },
                        orderBy: { keyword: { name: 'asc' } },
                    },
                },
            });
            if (!weapon) {
                throw new Error('Could not find weapon');
            }
            return weapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch weapon');
        }
    },
    createOrUpdateWeapon: async (formData) => {
        var _a;
        try {
            const weapon = await prisma.weapon.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0 },
                include: {
                    keywords: { select: { id: true } },
                },
            });
            if (weapon && weapon.keywords) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: weapon.keywords.map((keyword) => keyword.id) },
                    },
                });
            }
            const { id, weaponLinkId, armorLinkId, cyberneticLinkId, vehicleLinkId, droneLinkId, weaponIds, armorIds, cyberneticIds, actionIds, keywordIds, stats, characterInventoryId } = formData, data = __rest(formData, ["id", "weaponLinkId", "armorLinkId", "cyberneticLinkId", "vehicleLinkId", "droneLinkId", "weaponIds", "armorIds", "cyberneticIds", "actionIds", "keywordIds", "stats", "characterInventoryId"]);
            await enforceSingularLinking(id, weaponIds, armorIds, cyberneticIds, actionIds, undefined);
            const keywordData = (keywordIds === null || keywordIds === void 0 ? void 0 : keywordIds.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newWeapon = await prisma.weapon.upsert({
                where: { id: id !== null && id !== void 0 ? id : 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), weaponLinkReference: {
                        upsert: {
                            where: { weaponId: id !== null && id !== void 0 ? id : 0 },
                            update: {
                                weapons: {
                                    set: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                                },
                                armors: {
                                    set: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
                                },
                                cybernetics: {
                                    set: cyberneticIds === null || cyberneticIds === void 0 ? void 0 : cyberneticIds.map((id) => ({ id })),
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
                                cybernetics: {
                                    connect: cyberneticIds === null || cyberneticIds === void 0 ? void 0 : cyberneticIds.map((id) => ({ id })),
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
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), weaponLinkReference: {
                        create: {
                            weapons: {
                                connect: weaponIds === null || weaponIds === void 0 ? void 0 : weaponIds.map((id) => ({ id })),
                            },
                            armors: {
                                connect: armorIds === null || armorIds === void 0 ? void 0 : armorIds.map((id) => ({ id })),
                            },
                            cybernetics: {
                                connect: cyberneticIds === null || cyberneticIds === void 0 ? void 0 : cyberneticIds.map((id) => ({ id })),
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
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create or update weapon');
        }
    },
    createCharacterWeaponCopy: async (inventoryId, weaponList) => {
        const weaponIds = weaponList === null || weaponList === void 0 ? void 0 : weaponList.map((weapon) => weapon.weaponId);
        const weapons = await prisma.weapon.findMany({
            where: { id: { in: weaponIds } },
            include: {
                weaponLinkReference: { include: includeWeaponLinkReference },
                keywords: { include: { keyword: true } },
            },
        });
        const promises = [];
        for (const { weaponId, quantity } of weaponList) {
            const weaponDetails = weapons.find((weapon) => weapon.id === weaponId);
            if (!weaponDetails)
                continue;
            let stats = Object.assign({}, weaponDetails.stats);
            if ((stats === null || stats === void 0 ? void 0 : stats.magCount) && !(stats === null || stats === void 0 ? void 0 : stats.currentMagCount)) {
                stats = Object.assign(Object.assign({}, stats), { currentMagCount: stats.magCount - 1 });
            }
            if ((stats === null || stats === void 0 ? void 0 : stats.magCapacity) && !(stats === null || stats === void 0 ? void 0 : stats.currentAmmoCount)) {
                stats = Object.assign(Object.assign({}, stats), { currentAmmoCount: stats.magCapacity });
            }
            const { weaponIds, armorIds, cyberneticIds, actionIds } = await createLinkedCopies(weaponDetails.weaponLinkReference, inventoryId, quantity);
            const keywordIds = (weaponDetails === null || weaponDetails === void 0 ? void 0 : weaponDetails.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const { keywords } = weaponDetails, rest = __rest(weaponDetails, ["keywords"]);
            const weaponData = Object.assign(Object.assign({}, rest), { stats,
                weaponIds,
                armorIds,
                cyberneticIds,
                actionIds,
                keywordIds, id: 0, characterInventoryId: Number(inventoryId), baseWeaponId: weaponDetails.id });
            if (weaponDetails) {
                for (let i = 0; i < quantity; i++) {
                    promises.push(weaponServices.createOrUpdateWeapon(weaponData));
                }
            }
        }
        const newWeapons = await Promise.all(promises);
        return newWeapons
            .filter((weapon) => weapon !== undefined)
            .map((weapon) => weapon.id);
    },
    deleteWeapon: async (weaponId) => {
        try {
            await prisma.weapon.delete({
                where: {
                    id: Number(weaponId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete weapon');
        }
    },
    deleteWeapons: async (weaponIds) => {
        try {
            await prisma.weapon.deleteMany({
                where: {
                    id: { in: weaponIds },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete weapons');
        }
    },
};
export default weaponServices;
