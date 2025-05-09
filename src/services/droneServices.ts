import prisma from '../config/database.js';
import { includeDroneLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { Drone, DroneStats } from '../types/drone.js';

const droneServices = {
  getDrones: async () => {
    try {
      const drones = await prisma.drone.findMany({
        where: { characterInventoryId: null },
        include: {
          droneLinkReference: { include: includeDroneLinkReference },
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
      const drone = await prisma.drone.findUnique({
        where: {
          id: Number(droneId),
        },
        include: {
          droneLinkReference: { include: includeDroneLinkReference },
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

  createOrUpdateDrone: async (formData: Drone) => {
    try {
      const drone = await prisma.drone.findUnique({
        where: { id: formData.id ?? 0 },
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
        weaponIds,
        actionIds,
        modificationIds,
        keywordIds,
        stats,
        characterInventoryId,
        ...data
      } = formData;

      await enforceSingularLinking(
        id,
        weaponIds,
        undefined,
        undefined,
        actionIds,
        modificationIds,
      );

      const keywordData =
        keywordIds?.map(
          (keyword: { keywordId: number; value: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newDrone = await prisma.drone.upsert({
        where: { id: id ?? 0 },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          droneLinkReference: {
            upsert: {
              where: { droneId: id ?? 0 },
              update: {
                weapons: {
                  set: weaponIds?.map((id) => ({ id })),
                },
                actions: {
                  set: actionIds?.map((id) => ({ id })),
                },
                modifications: {
                  set: modificationIds?.map((id) => ({ id })),
                },
              },
              create: {
                weapons: {
                  connect: weaponIds?.map((id) => ({ id })),
                },
                actions: {
                  connect: actionIds?.map((id) => ({ id })),
                },
                modifications: {
                  connect: modificationIds?.map((id) => ({ id })),
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
          droneLinkReference: {
            create: {
              weapons: {
                connect: weaponIds?.map((id) => ({ id })),
              },
              actions: {
                connect: actionIds?.map((id) => ({ id })),
              },
              modifications: {
                connect: modificationIds?.map((id) => ({ id })),
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

  createCharacterDroneCopy: async (
    inventoryId: number,
    droneList: {
      droneId: number;
      price: number | null;
      quantity: number;
    }[],
  ) => {
    const droneIds = droneList?.map((drone) => drone.droneId);

    const drones = await prisma.drone.findMany({
      where: { id: { in: droneIds } },
      include: {
        droneLinkReference: { include: includeDroneLinkReference },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { droneId, quantity } of droneList) {
      const droneDetails = drones.find((drone) => drone.id === droneId);

      if (!droneDetails) continue;

      let stats = {
        ...(droneDetails.stats as DroneStats),
      };

      if (stats?.health && !stats?.currentHealth) {
        stats = { ...stats, currentHealth: stats.health };
      }
      if (stats?.power && !stats?.currentPower) {
        stats = { ...stats, currentPower: stats.power };
      }

      const { weaponIds, actionIds, modificationIds } =
        await createLinkedCopies(
          droneDetails.droneLinkReference,
          inventoryId,
          quantity,
        );

      const keywordIds =
        droneDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = droneDetails;

      const droneData = {
        ...rest,
        stats,
        weaponIds,
        actionIds,
        modificationIds,
        keywordIds,
        id: 0,
        characterInventoryId: Number(inventoryId),
        baseDroneId: droneDetails.id,
      };

      if (droneDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(droneServices.createOrUpdateDrone(droneData));
        }
      }
    }

    await Promise.all(promises);
  },

  deleteDrone: async (droneId: string) => {
    try {
      await prisma.drone.delete({
        where: {
          id: Number(droneId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete drone');
    }
  },
};

export default droneServices;
