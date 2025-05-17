import prisma from '../config/database.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { Item } from '../types/item.js';

const cyberneticServices = {
  getCybernetics: async () => {
    try {
      const cybernetics = await prisma.item.findMany({
        where: { characterInventoryId: null, itemType: 'augmentation' },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return cybernetics;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cybernetics');
    }
  },

  getCyberneticById: async (cyberneticId: string) => {
    try {
      const cybernetic = await prisma.item.findUnique({
        where: {
          id: Number(cyberneticId),
          itemType: 'augmentation',
        },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      if (!cybernetic) {
        throw new Error('Could not find cybernetic');
      }

      return cybernetic;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cybernetic');
    }
  },

  createOrUpdateCybernetic: async (formData: Item) => {
    try {
      const cybernetic = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemType: 'augmentation' },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (cybernetic && cybernetic.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: cybernetic.keywords.map((keyword) => keyword.id) },
          },
        });
      }

      const {
        id,
        itemLinkId,
        itemIds,
        actionIds,
        keywordIds,
        stats,
        characterInventoryId,
        ...data
      } = formData;

      await enforceSingularLinking(id, itemIds, actionIds);

      const keywordData =
        keywordIds?.map(
          (keyword: { keywordId: number; value: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newCybernetic = await prisma.item.upsert({
        where: { id: id ?? 0, itemType: 'augmentation' },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          itemLinkReference: {
            upsert: {
              where: { itemId: id ?? 0 },
              update: {
                items: {
                  set: itemIds?.map((id) => ({ id })),
                },
                actions: {
                  set: actionIds?.map((id) => ({ id })),
                },
              },
              create: {
                items: {
                  connect: itemIds?.map((id) => ({ id })),
                },
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
          itemType: 'augmentation',
          itemLinkReference: {
            create: {
              items: {
                connect: itemIds?.map((id) => ({ id })),
              },
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

      return newCybernetic;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create cybernetic');
    }
  },

  deleteCybernetic: async (cyberneticId: string) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(cyberneticId),
          itemType: 'augmentation',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete cybernetic');
    }
  },
};

export default cyberneticServices;
