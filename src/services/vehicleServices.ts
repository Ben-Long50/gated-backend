import prisma from '../config/database.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { Item } from '../types/item.js';

const vehicleServices = {
  getVehicles: async () => {
    try {
      const vehicles = await prisma.item.findMany({
        where: { itemType: 'vehicle', characterInventoryId: null },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return vehicles;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch vehicles');
    }
  },

  getVehicleById: async (vehicleId: string) => {
    try {
      const vehicle = await prisma.item.findUnique({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      if (!vehicle) {
        throw new Error('Could not find vehicle');
      }

      return vehicle;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch vehicle');
    }
  },

  createOrUpdateVehicle: async (formData: Item) => {
    try {
      const vehicle = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemType: 'vehicle' },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (vehicle && vehicle.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: vehicle.keywords.map((keyword) => keyword.id) },
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

      const newVehicle = await prisma.item.upsert({
        where: { id: id ?? 0, itemType: 'vehicle' },
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
          itemType: 'vehicle',
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

      return newVehicle;
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(error.message || 'Failed to create or update vehicle');
    }
  },

  deleteVehicle: async (vehicleId: string) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete vehicle');
    }
  },
};

export default vehicleServices;
