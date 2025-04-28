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
import actionServices from './actionServices.js';
const weaponServices = {
    getWeapons: async () => {
        try {
            const weapons = await prisma.weapon.findMany({
                where: {
                    characterInventoryId: null,
                    vehicleId: null,
                    cyberneticId: null,
                },
                include: { actions: true, keywords: { include: { keyword: true } } },
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
                include: { actions: true, keywords: { include: { keyword: true } } },
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
    createIntegratedWeapon: async (formData, picture, rarity, grade) => {
        try {
            const weapon = await prisma.weapon.findUnique({
                where: { id: formData.id },
                include: {
                    actions: { select: { id: true } },
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
            const _a = Object.assign(Object.assign({}, formData), { picture,
                rarity,
                grade }), { keywords, stats } = _a, data = __rest(_a, ["keywords", "stats"]);
            const keywordData = keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }));
            const newWeapon = await prisma.weapon.upsert({
                where: { id: (formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), keywords: { createMany: { data: keywordData } } }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), keywords: { createMany: { data: keywordData } } }),
            });
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update integrated weapon');
        }
    },
    createOrUpdateWeapon: async (formData) => {
        var _a;
        try {
            const weapon = await prisma.weapon.findUnique({
                where: { id: formData.id },
                include: {
                    actions: { select: { id: true } },
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
            const { actions, keywords, stats } = formData, data = __rest(formData, ["actions", "keywords", "stats"]);
            const oldActionIds = (_a = weapon === null || weapon === void 0 ? void 0 : weapon.actions) === null || _a === void 0 ? void 0 : _a.map((id) => id.id);
            const newActionIds = (actions === null || actions === void 0 ? void 0 : actions.map((action) => action.id)) || [];
            const actionsToDelete = (oldActionIds === null || oldActionIds === void 0 ? void 0 : oldActionIds.filter((id) => !newActionIds.includes(id))) || [];
            if (actionsToDelete.length > 0) {
                await actionServices.deleteActions(actionsToDelete);
            }
            const actionIds = actions
                ? await Promise.all(actions.map(async (action) => {
                    const newAction = await actionServices.createAction(action);
                    return { id: newAction.id };
                }))
                : [];
            const keywordData = keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }));
            const newWeapon = await prisma.weapon.upsert({
                where: { id: data.id || 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), actions: {
                        connect: actionIds,
                    }, keywords: { createMany: { data: keywordData } } }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), actions: {
                        connect: actionIds,
                    }, keywords: { createMany: { data: keywordData } } }),
            });
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update weapon');
        }
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
