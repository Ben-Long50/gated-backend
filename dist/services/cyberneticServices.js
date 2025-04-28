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
import armorServices from './armorServices.js';
import weaponServices from './weaponServices.js';
const cyberneticServices = {
    getCybernetics: async () => {
        try {
            const cybernetics = await prisma.cybernetic.findMany({
                where: { characterInventoryId: null },
                include: {
                    weapons: {
                        orderBy: { name: 'asc' },
                        include: { keywords: { include: { keyword: true } } },
                    },
                    armor: {
                        orderBy: { name: 'asc' },
                        include: { keywords: { include: { keyword: true } } },
                    },
                    actions: { orderBy: { name: 'asc' } },
                    modifiers: { include: { action: true } },
                    keywords: { include: { keyword: true } },
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
                    weapons: {
                        orderBy: { name: 'asc' },
                        include: { keywords: { include: { keyword: true } } },
                    },
                    armor: {
                        orderBy: { name: 'asc' },
                        include: { keywords: { include: { keyword: true } } },
                    },
                    actions: { orderBy: { name: 'asc' } },
                    modifiers: { include: { action: true } },
                    keywords: { include: { keyword: true } },
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
        var _a, _b, _c;
        try {
            const cybernetic = await prisma.cybernetic.findUnique({
                where: { id: formData.id },
                include: {
                    weapons: { select: { id: true } },
                    armor: { select: { id: true } },
                    actions: { select: { id: true } },
                    modifiers: { select: { id: true } },
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
            const { weapons, armor, actions, modifiers, keywords, stats } = formData, data = __rest(formData, ["weapons", "armor", "actions", "modifiers", "keywords", "stats"]);
            if (cybernetic) {
                const oldModifierIds = cybernetic.modifiers.map((modifier) => modifier.id);
                await prisma.modifier.deleteMany({
                    where: { id: { in: oldModifierIds } },
                });
            }
            const oldWeaponIds = (_a = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.weapons) === null || _a === void 0 ? void 0 : _a.map((id) => id.id);
            const newWeaponIds = weapons.map((weapon) => weapon.id);
            const weaponsToDelete = (oldWeaponIds === null || oldWeaponIds === void 0 ? void 0 : oldWeaponIds.filter((id) => !newWeaponIds.includes(id))) || [];
            if (weaponsToDelete.length > 0) {
                await weaponServices.deleteWeapons(weaponsToDelete);
            }
            const oldArmorIds = (_b = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.armor) === null || _b === void 0 ? void 0 : _b.map((id) => id.id);
            const newArmorIds = armor.map((armor) => armor.id);
            const armorToDelete = (oldArmorIds === null || oldArmorIds === void 0 ? void 0 : oldArmorIds.filter((id) => !newArmorIds.includes(id))) || [];
            if (armorToDelete.length > 0) {
                await armorServices.deleteArmors(armorToDelete);
            }
            const oldActionIds = (_c = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.actions) === null || _c === void 0 ? void 0 : _c.map((id) => id.id);
            const newActionIds = actions.map((action) => action.id);
            const actionsToDelete = (oldActionIds === null || oldActionIds === void 0 ? void 0 : oldActionIds.filter((id) => !newActionIds.includes(id))) || [];
            if (actionsToDelete.length > 0) {
                await actionServices.deleteActions(actionsToDelete);
            }
            const weaponIds = await Promise.all(weapons.map(async (weapon) => {
                const newWeapon = await weaponServices.createIntegratedWeapon(weapon, formData.picture, formData.rarity, formData.grade);
                return { id: newWeapon.id };
            }));
            const armorIds = await Promise.all(armor.map(async (armor) => {
                const newArmor = await armorServices.createIntegratedArmor(armor, formData.picture, formData.rarity, formData.grade);
                return { id: newArmor.id };
            }));
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
            const newCybernetic = await prisma.cybernetic.upsert({
                where: { id: formData.id || 0 },
                update: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), weapons: {
                        connect: weaponIds,
                    }, armor: {
                        connect: armorIds,
                    }, actions: {
                        connect: actionIds,
                    }, keywords: { createMany: { data: keywordData } }, modifiers: {
                        createMany: {
                            data: modifiers.map((_a) => {
                                var { action } = _a, modifier = __rest(_a, ["action"]);
                                return (Object.assign(Object.assign({}, modifier), { actionId: action ? Number(action) : null }));
                            }),
                        },
                    } }),
                create: Object.assign(Object.assign({}, data), { stats: Object.assign({}, stats), weapons: {
                        connect: weaponIds,
                    }, armor: {
                        connect: armorIds,
                    }, actions: {
                        connect: actionIds,
                    }, keywords: { createMany: { data: keywordData } }, modifiers: {
                        createMany: {
                            data: modifiers.map((_a) => {
                                var { action } = _a, modifier = __rest(_a, ["action"]);
                                return (Object.assign(Object.assign({}, modifier), { actionId: action ? Number(action) : null }));
                            }),
                        },
                    } }),
            });
            return newCybernetic;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create cybernetic');
        }
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
