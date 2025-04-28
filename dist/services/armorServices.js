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
import { getItemKeywords } from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
const armorServices = {
    getArmor: async () => {
        try {
            const armor = await prisma.armor.findMany({
                where: { characterInventoryId: null, cyberneticId: null },
                include: { actions: true, keywords: { include: { keyword: true } } },
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
                include: { actions: true, keywords: { include: { keyword: true } } },
            });
            if (!armor) {
                throw new Error('Could not find armor');
            }
            const armorDetails = await getItemKeywords(armor);
            return armorDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    },
    createIntegratedArmor: async (formData, picture, rarity, grade) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: { id: formData.id },
                include: {
                    actions: { select: { id: true } },
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
            const _a = Object.assign(Object.assign({}, formData), { picture,
                rarity,
                grade }), { keywords, stats } = _a, data = __rest(_a, ["keywords", "stats"]);
            const keywordData = keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }));
            const newArmor = await prisma.armor.upsert({
                where: { id: (formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), keywords: { createMany: { data: keywordData } } }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), keywords: { createMany: { data: keywordData } } }),
            });
            return newArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update integrated armor');
        }
    },
    createOrUpdateArmor: async (formData) => {
        var _a;
        try {
            const armor = await prisma.armor.findUnique({
                where: { id: formData.id },
                include: {
                    actions: { select: { id: true } },
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
            const { actions, keywords, stats } = formData, data = __rest(formData, ["actions", "keywords", "stats"]);
            const oldActionIds = (_a = armor === null || armor === void 0 ? void 0 : armor.actions) === null || _a === void 0 ? void 0 : _a.map((id) => id.id);
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
            const newArmor = await prisma.armor.upsert({
                where: { id: data.id || 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), actions: {
                        connect: actionIds,
                    }, keywords: { createMany: { data: keywordData } } }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), actions: {
                        connect: actionIds,
                    }, keywords: { createMany: { data: keywordData } } }),
            });
            return newArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update armor');
        }
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
