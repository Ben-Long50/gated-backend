import prisma from '../config/database.js';
import { Item, ItemStats } from '../types/item.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';

const itemServices = {
  getItems: async () => {
    try {
      const items = await prisma.item.findMany({
        where: { characterInventory: null },
        include: {
          itemLinkReference: {
            include: { actions: { orderBy: { name: 'asc' } } },
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
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
        include: {
          itemLinkReference: {
            include: { actions: { orderBy: { name: 'asc' } } },
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      return item;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch item');
    }
  },

  createOrUpdateItem: async (formData: Item) => {
    try {
      const item = await prisma.item.findUnique({
        where: { id: formData.id },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (item && item.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: item.keywords.map((keyword) => keyword.id) },
          },
        });
      }

      const {
        id,
        actionIds,
        keywordIds,
        stats,
        characterInventoryId,
        ...data
      } = formData;

      await enforceSingularLinking(
        id,
        undefined,
        undefined,
        undefined,
        actionIds,
        undefined,
      );

      const keywordData =
        keywordIds?.map(
          (keyword: { keywordId: number; value?: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newItem = await prisma.item.upsert({
        where: { id: formData.id },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          itemLinkReference: {
            upsert: {
              where: { itemId: id },
              update: {
                actions: {
                  set: actionIds?.map((id) => ({ id })),
                },
              },
              create: {
                actions: {
                  connect: actionIds?.map((id) => ({ id })),
                },
              },
            },
          },
          keywords: { createMany: { data: keywordData } },
          characterInventory: characterInventoryId
            ? {
                connect: {
                  id: characterInventoryId,
                },
              }
            : undefined,
        },
        create: {
          ...data,
          stats: {
            ...stats,
          },
          itemLinkReference: {
            create: {
              actions: {
                connect: actionIds?.map((id) => ({ id })),
              },
            },
          },
          keywords: { createMany: { data: keywordData } },
          characterInventory: characterInventoryId
            ? {
                connect: {
                  id: characterInventoryId,
                },
              }
            : undefined,
        },
      });

      return newItem;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update item');
    }
  },

  createCharacterItemCopy: async (
    inventoryId: number,
    itemList: { itemId: number; price: number | null; quantity: number }[],
  ) => {
    const itemIds = itemList?.map((item) => item.itemId);

    const items = await prisma.item.findMany({
      where: { id: { in: itemIds } },
      include: {
        itemLinkReference: { include: { actions: true } },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { itemId, quantity } of itemList) {
      const itemDetails = items.find((item) => item.id === itemId);

      if (!itemDetails) continue;

      let stats = { ...(itemDetails.stats as ItemStats) };

      if (stats?.power && !stats?.currentPower) {
        stats = { ...stats, currentPower: stats.power };
      }

      if (stats?.power && !stats?.currentPower) {
        stats = { ...stats, currentPower: stats.power };
      }

      const { actionIds } = await createLinkedCopies(
        itemDetails.itemLinkReference,
        inventoryId,
        quantity,
      );

      const keywordIds =
        itemDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = itemDetails;

      const itemData = {
        ...rest,
        stats,
        actionIds,
        keywordIds,
        id: 0,
        characterInventoryId: Number(inventoryId),
        baseItemId: itemDetails.id,
      };

      if (itemDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(itemServices.createOrUpdateItem(itemData));
        }
      }
    }

    const newItems = await Promise.all(promises);

    return newItems.filter((item) => item !== undefined).map((item) => item.id);
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
