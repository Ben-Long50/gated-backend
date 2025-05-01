import prisma from '../config/database.js';
import { Vehicle, VehicleStats } from '../types/vehicle.js';
import { includeVehicleLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';

const vehicleServices = {
  getVehicles: async () => {
    try {
      const vehicles = await prisma.vehicle.findMany({
        where: { characterInventoryId: null },
        include: {
          vehicleLinkReference: { include: includeVehicleLinkReference },
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
      const vehicle = await prisma.vehicle.findUnique({
        where: {
          id: Number(vehicleId),
        },
        include: {
          vehicleLinkReference: { include: includeVehicleLinkReference },
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

  createOrUpdateVehicle: async (formData: Vehicle) => {
    try {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id: formData.id },
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
        weaponIds,
        armorIds,
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
        armorIds,
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

      const newVehicle = await prisma.vehicle.upsert({
        where: { id },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          vehicleLinkReference: {
            upsert: {
              where: { vehicleId: id },
              update: {
                weapons: {
                  set: weaponIds?.map((id) => ({ id })),
                },
                armors: {
                  set: armorIds?.map((id) => ({ id })),
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
                armors: {
                  connect: armorIds?.map((id) => ({ id })),
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
          vehicleLinkReference: {
            create: {
              weapons: {
                connect: weaponIds?.map((id) => ({ id })),
              },
              armors: {
                connect: armorIds?.map((id) => ({ id })),
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

      return newVehicle;
    } catch (error: any) {
      console.error(error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(error.message || 'Failed to create or update vehicle');
    }
  },

  createCharacterVehicleCopy: async (
    inventoryId: string,
    vehicleList: {
      vehicleId: number;
      price: number | null;
      quantity: number;
    }[],
  ) => {
    const vehicleIds = vehicleList?.map((vehicle) => vehicle.vehicleId);

    const vehicles = await prisma.vehicle.findMany({
      where: { id: { in: vehicleIds } },
      include: {
        vehicleLinkReference: { include: includeVehicleLinkReference },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { vehicleId, quantity } of vehicleList) {
      const vehicleDetails = vehicles.find(
        (vehicle) => vehicle.id === vehicleId,
      );

      if (!vehicleDetails) continue;

      let stats = {
        ...(vehicleDetails.stats as VehicleStats),
      };

      if (stats?.hull && !stats?.currentHull) {
        stats = { ...stats, currentHull: stats.hull };
      }
      if (stats?.cargo && !stats?.currentCargo) {
        stats = { ...stats, currentCargo: 0 };
      }
      if (stats?.hangar && !stats?.currentHangar) {
        stats = { ...stats, currentHangar: 0 };
      }
      if (stats?.pass && !stats?.currentPass) {
        stats = { ...stats, currentPass: 0 };
      }
      if (stats?.weapon && !stats?.currentWeapon) {
        stats = {
          ...stats,
          currentWeapon: vehicleDetails?.vehicleLinkReference?.weapons.length,
        };
      }

      const { weaponIds, armorIds, actionIds, modificationIds } =
        await createLinkedCopies(
          vehicleDetails.vehicleLinkReference,
          inventoryId,
          quantity,
        );

      const keywordIds =
        vehicleDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = vehicleDetails;

      const vehicleData = {
        ...rest,
        stats,
        weaponIds,
        armorIds,
        actionIds,
        modificationIds,
        keywordIds,
        id: 0,
        characterInventoryId: Number(inventoryId),
        baseVehicleId: vehicleDetails.id,
      };

      if (vehicleDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(vehicleServices.createOrUpdateVehicle(vehicleData));
        }
      }
    }

    await Promise.all(promises);
  },

  // swapWeapons: async (newWeaponIds: number[], previousWeaponIds: number[]) => {
  //   const oldIds =
  //     previousWeaponIds.filter((id) => !newWeaponIds.includes(id)) || [];

  //   await prisma.weapon.deleteMany({
  //     where: { id: { in: oldIds }, characterInventoryId: null },
  //   });

  //   const newIds = newWeaponIds.filter(
  //     (id: number) => !previousWeaponIds.some((item) => item === id),
  //   );

  //   const weapons = await prisma.weapon.findMany({
  //     where: { id: { in: newIds }, characterInventoryId: null },
  //     include: { keywords: { include: { keyword: true } } },
  //   });

  //   const newOwnedIds = newIds.filter(
  //     (id) => !weapons.map((weapon) => weapon.id).includes(id),
  //   );

  //   const data = weapons.map(({ id, vehicleId, cyberneticId, ...rest }) => ({
  //     ...rest,
  //     picture: rest.picture
  //       ? (rest.picture as Prisma.InputJsonValue)
  //       : undefined,
  //     stats: rest.stats
  //       ? (rest.stats as Prisma.InputJsonValue)
  //       : Prisma.JsonNull,
  //     keywords: rest.keywords
  //       ? {
  //           createMany: {
  //             data: rest.keywords.map((keyword) => ({
  //               keywordId: keyword.keywordId,
  //               value: keyword.value,
  //             })),
  //           },
  //         }
  //       : undefined,
  //     actions: rest.actions
  //       ? {
  //           createMany: {
  //             data: rest.actions.map(({ id, baseActionId, ...action }) => ({
  //               ...action,
  //               baseActionId: id,
  //             })),
  //           },
  //         }
  //       : undefined,
  //   }));

  //   return {
  //     oldIds,
  //     newOwnedIds,
  //     data,
  //   };
  // },

  // swapMods: async (newModIds: number[], previousModIds: number[]) => {
  //   const oldIds = previousModIds.filter((id) => !newModIds.includes(id)) || [];

  //   await prisma.modification.deleteMany({
  //     where: { id: { in: oldIds }, characterInventoryId: null },
  //   });

  //   const newIds = newModIds.filter(
  //     (id: number) => !previousModIds.some((item) => item === id),
  //   );

  //   const modifications = await prisma.modification.findMany({
  //     where: { id: { in: newIds }, characterInventoryId: null },
  //   });

  //   const newOwnedIds = newIds.filter(
  //     (id) => !modifications.map((mod) => mod.id).includes(id),
  //   );

  //   const data = modifications.map(({ id, vehicleId, ...rest }) => ({
  //     ...rest,
  //   }));

  //   return {
  //     oldIds,
  //     newOwnedIds,
  //     data,
  //   };
  // },

  deleteVehicle: async (vehicleId: string) => {
    try {
      await prisma.vehicle.delete({
        where: {
          id: Number(vehicleId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete vehicle');
    }
  },
};

export default vehicleServices;
