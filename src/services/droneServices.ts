import prisma from '../config/database.js';
// import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { Item } from '../types/item.js';

const droneServices = {
  getDrones: async () => {
    try {
      const drones = await prisma.item.findMany({
        where: { itemType: 'drone', characterInventoryId: null },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return drones;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch drones');
    }
  },

  getDroneById: async (droneId: string) => {
    try {
      const drone = await prisma.item.findUnique({
        where: {
          id: Number(droneId),
          itemType: 'drone',
        },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      return drone;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch drone');
    }
  },

  createOrUpdateDrone: async (formData: Item) => {
    try {
      const drone = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemType: 'drone' },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (drone && drone.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: drone.keywords.map((keyword) => keyword.id) },
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

      const newDrone = await prisma.item.upsert({
        where: { id: id ?? 0, itemType: 'drone' },
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
          itemType: 'drone',
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

      return newDrone;
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(error.message || 'Failed to create or update drone');
    }
  },

  deleteDrone: async (droneId: string) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(droneId),
          itemType: 'drone',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete drone');
    }
  },
};

export default droneServices;
