import prisma from '../config/database.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { Item } from '../types/item.js';

const weaponServices = {
  getWeapons: async () => {
    try {
      const weapons = await prisma.item.findMany({
        where: {
          itemType: 'weapon',
          characterInventoryId: null,
          itemLinkId: null,
        },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return weapons;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapons');
    }
  },

  getWeaponById: async (weaponId: string) => {
    try {
      const weapon = await prisma.item.findUnique({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      if (!weapon) {
        throw new Error('Could not find weapon');
      }

      return weapon;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapon');
    }
  },

  createOrUpdateWeapon: async (formData: Item) => {
    try {
      const weapon = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemType: 'weapon' },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (weapon && weapon.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: weapon.keywords.map((keyword) => keyword.id) },
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

      const newWeapon = await prisma.item.upsert({
        where: { id: id ?? 0, itemType: 'weapon' },
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
          itemType: 'weapon',
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

      return newWeapon;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create or update weapon');
    }
  },

  deleteWeapon: async (weaponId: string) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete weapon');
    }
  },

  deleteWeapons: async (weaponIds: number[]) => {
    try {
      await prisma.item.deleteMany({
        where: {
          id: { in: weaponIds },
          itemType: 'weapon',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete weapons');
    }
  },
};

export default weaponServices;
