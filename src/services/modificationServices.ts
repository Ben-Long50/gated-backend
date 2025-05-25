import prisma from '../config/database.js';
import { Item } from '../types/item.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';

const modificationServices = {
  getModifications: async () => {
    try {
      const modificiations = await prisma.item.findMany({
        where: { itemType: 'modification', characterInventoryId: null },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return modificiations;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch modifications');
    }
  },

  getModificationById: async (modId: string) => {
    try {
      const modification = await prisma.item.findUnique({
        where: {
          id: Number(modId),
          itemType: 'modification',
        },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      return modification;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch modification');
    }
  },

  createOrUpdateModification: async (formData: Item) => {
    try {
      const modification = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemType: 'modification' },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (modification && modification.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: modification.keywords.map((keyword) => keyword.id) },
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
          (keyword: { keywordId: number; value?: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newModification = await prisma.item.upsert({
        where: { id: id ?? 0, itemType: 'modification' },
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
          characterInventoryId,
        },
        create: {
          ...data,
          stats: {
            ...stats,
          },
          itemType: 'modification',
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
          characterInventoryId,
        },
      });

      return newModification;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update modification');
    }
  },

  deleteModification: async (modificationId: string) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(modificationId),
          itemType: 'modification',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete modification');
    }
  },
};

export default modificationServices;
