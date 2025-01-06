import { ActionType } from '@prisma/client';
import prisma from '../config/database.js';

const actionServices = {
  getActions: async () => {
    try {
      const actions = await prisma.action.findMany({
        orderBy: { name: 'asc' },
      });
      return actions;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch actions');
    }
  },

  getActionById: async (actionId: string) => {
    try {
      const action = await prisma.action.findUnique({
        where: { id: Number(actionId) },
      });
      return action;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch action');
    }
  },

  createAction: async (formData: {
    name: string;
    description: string;
    costs: string;
    attribute: string;
    skill: string;
    actionType: ActionType;
    actionSubtypes: string[];
    actionId: string;
  }) => {
    try {
      const newAction = await prisma.action.upsert({
        where: { id: Number(formData.actionId) || 0 },
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
      console.error(error);
      throw new Error('Failed to create or update action');
    }
  },

  deleteActionByName: async (actionName: string) => {
    try {
      await prisma.action.delete({
        where: {
          name: actionName,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete action');
    }
  },
};

export default actionServices;
