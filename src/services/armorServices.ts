import prisma from '../config/database.js';
import { Item } from '../types/item.js';
// import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';

const armorServices = {
  getArmor: async () => {
    try {
      const armor = await prisma.item.findMany({
        where: { itemType: 'armor', characterInventoryId: null },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return armor;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch armor');
    }
  },

  getArmorById: async (armorId: string) => {
    try {
      const armor = await prisma.item.findUnique({
        where: {
          id: Number(armorId),
          itemType: 'armor',
        },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      if (!armor) {
        throw new Error('Could not find armor');
      }

      return armor;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch armor');
    }
  },

  createOrUpdateArmor: async (formData: Item) => {
    try {
      const armor = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemType: 'armor' },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (armor && armor.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: armor.keywords.map((keyword) => keyword.id) },
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

      const newArmor = await prisma.item.upsert({
        where: { id: id ?? 0, itemType: 'armor' },
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
          itemType: 'armor',
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

      return newArmor;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create or update armor');
    }
  },

  deleteArmor: async (armorId: string) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(armorId),
          itemType: 'armor',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete armor');
    }
  },

  deleteArmors: async (armorIds: number[]) => {
    try {
      await prisma.item.deleteMany({
        where: {
          id: { in: armorIds },
          itemType: 'armor',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete armors');
    }
  },
};

export default armorServices;
