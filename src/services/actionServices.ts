import { ActionType } from '@prisma/client';
import prisma from '../config/database.js';

const actionServices = {
  getActions: async () => {
    try {
      const actions = await prisma.action.findMany({
        where: { characterInventory: null },
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
    roll: string;
    duration: string;
    actionType: ActionType;
    actionSubtypes: string[];
    id?: string;
  }) => {
    try {
      const action = await prisma.action.upsert({
        where: { id: Number(formData?.id) || 0 },
        update: {
          name: formData.name,
          description: formData.description,
          costs: formData.costs,
          roll: formData.roll,
          duration: formData.duration,
          actionType: formData.actionType,
          actionSubtypes: formData.actionSubtypes,
        },
        create: {
          name: formData.name,
          description: formData.description,
          costs: formData.costs,
          roll: formData.roll,
          duration: formData.duration,
          actionType: formData.actionType,
          actionSubtypes: formData.actionSubtypes,
        },
      });

      return action;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update action');
    }
  },

  deleteAction: async (actionId: string) => {
    try {
      await prisma.action.delete({
        where: {
          id: Number(actionId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete action');
    }
  },

  deleteActions: async (actionIds: number[]) => {
    try {
      await prisma.action.deleteMany({
        where: {
          id: { in: actionIds },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete actions');
    }
  },
};

export default actionServices;
