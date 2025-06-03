import { ActionType, Prisma } from '@prisma/client';
import prisma from '../config/database.js';
import { ActionCosts, ActionRoll } from '../types/action.js';
import { Stats } from '../types/item.js';

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
    costs: ActionCosts;
    roll: ActionRoll[];
    duration: { unit: string; value: number | null };
    actionType: ActionType;
    actionSubtypes: string[];
    modifiers: Stats;
    id?: number;
  }) => {
    try {
      const action = await prisma.action.upsert({
        where: { id: Number(formData?.id) || 0 },
        update: {
          name: formData.name,
          description: formData.description,
          costs: { ...formData.costs },
          roll: formData.roll as unknown as Prisma.JsonArray,
          duration: formData.duration,
          actionType: formData.actionType,
          actionSubtypes: formData.actionSubtypes,
          modifiers: { ...formData.modifiers },
        },
        create: {
          name: formData.name,
          description: formData.description,
          costs: { ...formData.costs },
          roll: formData.roll as unknown as Prisma.JsonArray,
          duration: formData.duration,
          actionType: formData.actionType,
          actionSubtypes: formData.actionSubtypes,
          modifiers: { ...formData.modifiers },
        },
      });

      return action;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update action');
    }
  },

  createCharacterActionCopy: async (
    inventoryId: number,
    actionList: { actionId: number; quantity: number }[],
  ) => {
    const actionIds = actionList?.map((action) => action.actionId);

    const actions = await prisma.action.findMany({
      where: { id: { in: actionIds } },
    });

    const newAction = await Promise.all(
      actionList.flatMap(({ actionId, quantity }) => {
        const actionDetails = actions.find((action) => action.id === actionId);

        if (actionDetails) {
          return Array.from({ length: quantity }).map(() =>
            prisma.action.create({
              data: {
                name: actionDetails.name,
                description: actionDetails.description,
                costs: actionDetails.costs || undefined,
                roll: actionDetails.roll || undefined,
                duration: actionDetails.duration || undefined,
                actionType: actionDetails.actionType,
                actionSubtypes: actionDetails.actionSubtypes,
                modifiers: { ...(actionDetails.modifiers as Stats) },
                characterInventory: {
                  connect: { id: Number(inventoryId) },
                },
                baseActionId: actionDetails.id,
              },
            }),
          );
        }
        return;
      }),
    );

    return newAction
      .filter((action) => action !== undefined)
      .map((action) => action.id);
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
