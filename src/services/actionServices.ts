import prisma from '../config/database.js';

const actionServices = {
  getActions: async () => {
    try {
      const actions = await prisma.action.findMany({
        orderBy: { name: 'asc' },
      });
      return actions;
    } catch (error) {
      throw new Error('Failed to fetch actions');
    }
  },

  createAction: async (formData) => {
    try {
      const newAction = await prisma.action.upsert({
        where: { name: formData.name },
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
    } catch (error) {
      throw new Error('Failed to create or update action');
    }
  },

  deleteActionByName: async (actionName) => {
    try {
      await prisma.action.delete({
        where: {
          name: actionName,
        },
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete action');
    }
  },
};

export default actionServices;