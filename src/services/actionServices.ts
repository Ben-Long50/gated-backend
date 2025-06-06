import { ActionType, Prisma } from '@prisma/client';
import prisma from '../config/database.js';
import { ActionCosts, ActionRoll } from '../types/action.js';
import { Stats } from '../types/item.js';

const actionServices = {
  getActions: async () => {
    try {
      const actions = await prisma.action.findMany({
        where: { characterInventory: null, baseActionId: null },
        include: { keywordModifiers: { include: { keyword: true } } },
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
        include: { keywordModifiers: { include: { keyword: true } } },
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
    cooldown: { unit: string; value: number | null };
    actionType: ActionType;
    actionSubtypes: string[];
    modifiers: Stats;
    keywordModifierIds: { keywordId: number; value?: number | null }[];
    id?: number;
  }) => {
    try {
      const action = await prisma.action.findUnique({
        where: { id: formData.id ?? 0 },
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

      const keywordModifierData =
        formData.keywordModifierIds?.map(
          (keyword: { keywordId: number; value?: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newAction = await prisma.action.upsert({
        where: { id: Number(formData?.id) || 0 },
        update: {
          name: formData.name,
          description: formData.description,
          costs: { ...formData.costs },
          roll: formData.roll as unknown as Prisma.JsonArray,
          duration: formData.duration,
          cooldown: formData.cooldown,
          actionType: formData.actionType,
          actionSubtypes: formData.actionSubtypes,
          modifiers: { ...formData.modifiers },
          keywordModifiers: { createMany: { data: keywordModifierData } },
        },
        create: {
          name: formData.name,
          description: formData.description,
          costs: { ...formData.costs },
          roll: formData.roll as unknown as Prisma.JsonArray,
          duration: formData.duration,
          cooldown: formData.cooldown,
          actionType: formData.actionType,
          actionSubtypes: formData.actionSubtypes,
          modifiers: { ...formData.modifiers },
          keywordModifiers: { createMany: { data: keywordModifierData } },
        },
      });

      return newAction;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update action');
    }
  },

  createActionCopy: async (actionId: number) => {
    try {
      const actionInfo = await prisma.action.findUnique({
        where: { id: actionId },
      });

      if (!actionInfo) {
        throw new Error('Failed to find action');
      }

      const { id, costs, roll, duration, cooldown, modifiers, ...data } =
        actionInfo;

      const action = await prisma.action.create({
        data: {
          ...data,
          ...(costs ? { costs } : {}),
          ...(roll ? { roll } : {}),
          ...(duration ? { duration } : {}),
          ...(cooldown ? { cooldown } : {}),
          ...(modifiers ? { modifiers } : {}),
          baseActionId: id,
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
                cooldown: actionDetails.cooldown || undefined,
                actionType: actionDetails.actionType,
                actionSubtypes: actionDetails.actionSubtypes,
                modifiers: { ...(actionDetails.modifiers as Stats) },
                characterInventory: {
                  connect: { id: Number(inventoryId) },
                },
                baseAction: { connect: { id: actionDetails.id } },
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

  activateAction: async (actionId: number, value: boolean) => {
    try {
      const action = await prisma.action.update({
        where: { id: actionId },
        data: { active: !value },
      });
      return action;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to toggle action');
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
