import prisma from '../config/database.js';
const actionServices = {
    getActions: async () => {
        try {
            const actions = await prisma.action.findMany({
                where: { characterInventoryId: null },
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
            const newAction = await prisma.action.upsert({
                where: { id: Number(formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    costs: formData.costs,
                    attribute: formData.attribute,
                    skill: formData.skill,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    costs: formData.costs,
                    attribute: formData.attribute,
                    skill: formData.skill,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                },
            });
            return newAction;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update action');
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
