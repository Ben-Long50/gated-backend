import { Action, ActionType } from '@prisma/client';
import prisma from '../config/database.js';
import { Item } from '../types/item.js';
import actionServices from './actionServices.js';
import { ActionCosts, ActionRoll } from '../types/action.js';

const itemServices = {
  getItems: async () => {
    try {
      const items = await prisma.item.findMany({
        where: { characterInventory: null },
        include: { actions: true, modifiers: { include: { action: true } } },
        orderBy: { name: 'asc' },
      });
      return items;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch items');
    }
  },

  getItemById: async (itemId: string) => {
    try {
      const item = await prisma.item.findUnique({
        where: { id: Number(itemId) },
        include: { actions: true, modifiers: { include: { action: true } } },
      });
      return item;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch item');
    }
  },

  createOrUpdateItem: async (formData: Item) => {
    try {
      const oldItem =
        (await prisma.item.findUnique({
          where: { id: formData.id },
          select: {
            actions: { select: { id: true } },
            modifiers: { include: { action: true } },
          },
        })) || undefined;

      if (oldItem) {
        const oldModifierIds = oldItem.modifiers.map((modifier) => modifier.id);
        await prisma.modifier.deleteMany({
          where: { id: { in: oldModifierIds } },
        });
      }

      const oldItemIds = oldItem?.actions.map(
        (action: { id: number }) => action.id,
      );

      const newItemIds = formData.actions.map((action: Action) => action.id);

      const actionsToDelete =
        oldItemIds?.filter((id: number) => !newItemIds.includes(id)) || [];

      if (actionsToDelete.length > 0) {
        await actionServices.deleteActions(actionsToDelete);
      }

      const actionIds = await Promise.all(
        formData.actions.map(
          async (action: {
            name: string;
            description: string;
            costs: ActionCosts;
            roll: ActionRoll[];
            duration: { unit: string; value: number };
            actionType: ActionType;
            actionSubtypes: string[];
            id?: number;
          }) => {
            const newAction = await actionServices.createAction(action);
            return { id: newAction.id };
          },
        ),
      );

      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return formData.picture;
        }
      };

      const pictureInfo = getPictureInfo();

      const { id, publicId, imageUrl, picture, ...itemData } = formData;

      const item = await prisma.item.upsert({
        where: { id: formData.id },
        update: {
          ...itemData,
          picture: pictureInfo,
          actions: {
            connect: actionIds,
          },
          modifiers: {
            createMany: {
              data: formData.modifiers.map(({ action, ...modifier }) => ({
                ...modifier,
                actionId: action ? Number(action) : null,
              })),
            },
          },
        },
        create: {
          ...itemData,
          picture: pictureInfo,
          actions: {
            connect: actionIds,
          },
          modifiers: {
            createMany: {
              data: formData.modifiers.map(({ action, ...modifier }) => ({
                ...modifier,
                actionId: action ? Number(action) : null,
              })),
            },
          },
        },
      });

      return item;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update item');
    }
  },

  deleteItem: async (itemId: string) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(itemId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete item');
    }
  },

  deleteItems: async (itemIds: number[]) => {
    try {
      await prisma.item.deleteMany({
        where: {
          id: { in: itemIds },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete items');
    }
  },
};

export default itemServices;
