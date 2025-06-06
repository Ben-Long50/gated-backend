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
const actionServices = {
    getActions: async () => {
        try {
            const actions = await prisma.action.findMany({
                where: { characterInventory: null, baseActionId: null },
                include: { keywordModifiers: { include: { keyword: true } } },
                orderBy: { name: 'asc' },
            });
            return actions;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch actions');
        }
    },
    getActionById: async (actionId) => {
        try {
            const action = await prisma.action.findUnique({
                where: { id: Number(actionId) },
                include: { keywordModifiers: { include: { keyword: true } } },
            });
            return action;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch action');
        }
    },
    createAction: async (formData) => {
        var _a, _b;
        try {
            const action = await prisma.action.findUnique({
                where: { id: (_a = formData.id) !== null && _a !== void 0 ? _a : 0 },
                include: {
                    keywordModifiers: { select: { id: true } },
                },
            });
            if (action && action.keywordModifiers) {
                await prisma.keywordReference.deleteMany({
                    where: {
                        id: { in: action.keywordModifiers.map((keyword) => keyword.id) },
                    },
                });
            }
            const keywordModifierData = ((_b = formData.keywordModifierIds) === null || _b === void 0 ? void 0 : _b.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
            }))) || [];
            const newAction = await prisma.action.upsert({
                where: { id: Number(formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    costs: Object.assign({}, formData.costs),
                    roll: formData.roll,
                    duration: formData.duration,
                    cooldown: formData.cooldown,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                    modifiers: Object.assign({}, formData.modifiers),
                    keywordModifiers: { createMany: { data: keywordModifierData } },
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    costs: Object.assign({}, formData.costs),
                    roll: formData.roll,
                    duration: formData.duration,
                    cooldown: formData.cooldown,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                    modifiers: Object.assign({}, formData.modifiers),
                    keywordModifiers: { createMany: { data: keywordModifierData } },
                },
            });
            return newAction;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update action');
        }
    },
    createActionCopy: async (actionId) => {
        try {
            const actionInfo = await prisma.action.findUnique({
                where: { id: actionId },
            });
            if (!actionInfo) {
                throw new Error('Failed to find action');
            }
            const { id, costs, roll, duration, cooldown, modifiers } = actionInfo, data = __rest(actionInfo, ["id", "costs", "roll", "duration", "cooldown", "modifiers"]);
            const action = await prisma.action.create({
                data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, data), (costs ? { costs } : {})), (roll ? { roll } : {})), (duration ? { duration } : {})), (cooldown ? { cooldown } : {})), (modifiers ? { modifiers } : {})), { baseActionId: id }),
            });
            return action;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update action');
        }
    },
    createCharacterActionCopy: async (inventoryId, actionList) => {
        const actionIds = actionList === null || actionList === void 0 ? void 0 : actionList.map((action) => action.actionId);
        const actions = await prisma.action.findMany({
            where: { id: { in: actionIds } },
        });
        const newAction = await Promise.all(actionList.flatMap(({ actionId, quantity }) => {
            const actionDetails = actions.find((action) => action.id === actionId);
            if (actionDetails) {
                return Array.from({ length: quantity }).map(() => prisma.action.create({
                    data: {
                        name: actionDetails.name,
                        description: actionDetails.description,
                        costs: actionDetails.costs || undefined,
                        roll: actionDetails.roll || undefined,
                        duration: actionDetails.duration || undefined,
                        cooldown: actionDetails.cooldown || undefined,
                        actionType: actionDetails.actionType,
                        actionSubtypes: actionDetails.actionSubtypes,
                        modifiers: Object.assign({}, actionDetails.modifiers),
                        characterInventory: {
                            connect: { id: Number(inventoryId) },
                        },
                        baseAction: { connect: { id: actionDetails.id } },
                    },
                }));
            }
            return;
        }));
        return newAction
            .filter((action) => action !== undefined)
            .map((action) => action.id);
    },
    activateAction: async (actionId, value) => {
        try {
            const action = await prisma.action.update({
                where: { id: actionId },
                data: { active: !value },
            });
            return action;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to toggle action');
        }
    },
    deleteAction: async (actionId) => {
        try {
            await prisma.action.delete({
                where: {
                    id: Number(actionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete action');
        }
    },
    deleteActions: async (actionIds) => {
        try {
            await prisma.action.deleteMany({
                where: {
                    id: { in: actionIds },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete actions');
        }
    },
};
export default actionServices;
