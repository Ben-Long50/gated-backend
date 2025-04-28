import { Prisma } from '@prisma/client';
import prisma from '../config/database.js';
import { Vehicle } from '../types/vehicle.js';

const vehicleServices = {
  getVehicles: async () => {
    try {
      const vehicles = await prisma.vehicle.findMany({
        where: { characterInventoryId: null },
        orderBy: { name: 'asc' },
        include: { weapons: true, modifications: true },
      });

      return vehicles;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch vehicles');
    }
  },

  getVehicleMods: async () => {
    try {
      const vehicleMods = await prisma.modification.findMany({
        where: { characterInventoryId: null, vehicleId: null },
        orderBy: { name: 'asc' },
      });

      return vehicleMods;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch vehicle modifications');
    }
  },

  getVehicleById: async (vehicleId: string) => {
    try {
      const vehicle = await prisma.vehicle.findUnique({
        where: {
          id: Number(vehicleId),
        },
        include: { weapons: true, modifications: true },
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

  getVehicleModById: async (modId: string) => {
    try {
      const vehicleMod = await prisma.modification.findUnique({
        where: {
          id: Number(modId),
        },
      });

      return vehicleMod;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch vehicle');
    }
  },

  createOrUpdateVehicle: async (formData: Vehicle) => {
    try {
      if (
        formData.stats.weapon
          ? formData.weapons.length > formData.stats.weapon
          : formData.weapons.length > 0
      ) {
        throw new Error(
          'Your vehicle does not have enough weapon slots to support the chosen weapons',
        );
      }

      const oldVehicle =
        (await prisma.vehicle.findUnique({
          where: { id: formData.id },
          include: {
            weapons: { select: { id: true } },
            modifications: { select: { id: true } },
          },
        })) || null;

      const previousWeaponIds = oldVehicle
        ? oldVehicle.weapons.map((item) => item.id)
        : [];

      const previousModIds = oldVehicle
        ? oldVehicle.modifications.map((item) => item.id)
        : [];

      const weaponData = await vehicleServices.swapWeapons(
        formData.weapons,
        previousWeaponIds,
      );

      const modData = await vehicleServices.swapMods(
        formData.modifications,
        previousModIds,
      );

      const newVehicle = await prisma.vehicle.upsert({
        where: { id: formData.id },
        update: {
          name: formData.name,
          rarity: formData.rarity,
          grade: formData.grade,
          picture: formData.picture,
          stats: { ...formData.stats },
          price: formData.price,
          description: formData.description,
          weapons: {
            create: weaponData.data,
            connect: weaponData.newOwnedIds.map((id) => ({ id })),
            disconnect: weaponData.oldIds.map((id) => ({ id })),
          },
          modifications: {
            create: modData.data,
            connect: modData.newOwnedIds.map((id) => ({ id })),
            disconnect: modData.oldIds.map((id) => ({ id })),
          },
        },
        create: {
          name: formData.name,
          rarity: formData.rarity,
          grade: formData.grade,
          picture: formData.picture,
          stats: { ...formData.stats },
          price: formData.price,
          description: formData.description,
          weapons: { create: weaponData.data },
          modifications: { create: modData.data },
        },
      });

      return newVehicle;
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create or update vehicle');
    }
  },

  swapWeapons: async (newWeaponIds: number[], previousWeaponIds: number[]) => {
    const oldIds =
      previousWeaponIds.filter((id) => !newWeaponIds.includes(id)) || [];

    await prisma.weapon.deleteMany({
      where: { id: { in: oldIds }, characterInventoryId: null },
    });

    const newIds = newWeaponIds.filter(
      (id: number) => !previousWeaponIds.some((item) => item === id),
    );

    const weapons = await prisma.weapon.findMany({
      where: { id: { in: newIds }, characterInventoryId: null },
      include: { keywords: { include: { keyword: true } } },
    });

    const newOwnedIds = newIds.filter(
      (id) => !weapons.map((weapon) => weapon.id).includes(id),
    );

    const data = weapons.map(({ id, vehicleId, cyberneticId, ...rest }) => ({
      ...rest,
      picture: rest.picture
        ? (rest.picture as Prisma.InputJsonValue)
        : undefined,
      stats: rest.stats
        ? (rest.stats as Prisma.InputJsonValue)
        : Prisma.JsonNull,
      keywords: rest.keywords
        ? {
            createMany: {
              data: rest.keywords.map((keyword) => ({
                keywordId: keyword.keywordId,
                value: keyword.value,
              })),
            },
          }
        : undefined,
      // actions: rest.actions
      //   ? {
      //       createMany: {
      //         data: rest.actions.map(({ id, baseActionId, ...action }) => ({
      //           ...action,
      //           baseActionId: id,
      //         })),
      //       },
      //     }
      //   : undefined,
    }));

    return {
      oldIds,
      newOwnedIds,
      data,
    };
  },

  swapMods: async (newModIds: number[], previousModIds: number[]) => {
    const oldIds = previousModIds.filter((id) => !newModIds.includes(id)) || [];

    await prisma.modification.deleteMany({
      where: { id: { in: oldIds }, characterInventoryId: null },
    });

    const newIds = newModIds.filter(
      (id: number) => !previousModIds.some((item) => item === id),
    );

    const modifications = await prisma.modification.findMany({
      where: { id: { in: newIds }, characterInventoryId: null },
    });

    const newOwnedIds = newIds.filter(
      (id) => !modifications.map((mod) => mod.id).includes(id),
    );

    const data = modifications.map(({ id, vehicleId, ...rest }) => ({
      ...rest,
    }));

    return {
      oldIds,
      newOwnedIds,
      data,
    };
  },

  createOrUpdateVehicleMod: async (formData: {
    modId: string;
    name: string;
    price: string;
    modificationType: string;
    description: string;
  }) => {
    try {
      const newVehicleMod = await prisma.modification.upsert({
        where: { id: Number(formData.modId) || 0 },
        update: {
          name: formData.name,
          price: Number(formData.price),
          modificationType: formData.modificationType,
          description: formData.description,
        },
        create: {
          name: formData.name,
          price: Number(formData.price),
          modificationType: formData.modificationType,
          description: formData.description,
        },
      });

      return newVehicleMod;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update vehicle modification');
    }
  },

  deleteVehicle: async (vehicleId: string) => {
    try {
      const deletedVehicle = await prisma.vehicle.delete({
        where: {
          id: Number(vehicleId),
        },
        include: { weapons: { select: { id: true } } },
      });

      if (deletedVehicle.characterInventoryId === null) {
        await prisma.weapon.deleteMany({
          where: {
            id: { in: deletedVehicle.weapons?.map((weapon) => weapon.id) },
          },
        });
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete vehicle');
    }
  },

  deleteVehicleMod: async (modId: string) => {
    try {
      await prisma.modification.delete({
        where: {
          id: Number(modId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete vehicle modification');
    }
  },
};

export default vehicleServices;
