import prisma from '../config/database.js';
const actionServices = {
    getActions: async () => {
        try {
            const actions = await prisma.action.findMany({
                where: { characterInventory: null },
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
            });
            return action;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch action');
        }
    },
    createAction: async (formData) => {
        try {
            const action = await prisma.action.upsert({
                where: { id: Number(formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    costs: Object.assign({}, formData.costs),
                    roll: formData.roll,
                    duration: formData.duration,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                    modifiers: Object.assign({}, formData.modifiers),
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    costs: Object.assign({}, formData.costs),
                    roll: formData.roll,
                    duration: formData.duration,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                    modifiers: Object.assign({}, formData.modifiers),
                },
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
                        actionType: actionDetails.actionType,
                        actionSubtypes: actionDetails.actionSubtypes,
                        modifiers: Object.assign({}, actionDetails.modifiers),
                        characterInventory: {
                            connect: { id: Number(inventoryId) },
                        },
                        baseActionId: actionDetails.id,
                    },
                }));
            }
            return;
        }));
        return newAction
            .filter((action) => action !== undefined)
            .map((action) => action.id);
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
