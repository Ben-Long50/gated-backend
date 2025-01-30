import { Prisma } from '@prisma/client';
import prisma from '../config/database.js';

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

      // const vehicleDetails = await getItemWeapons(vehicle);

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

  createVehicle: async (formData: {
    publicId: string;
    imageUrl: string;
    picture: string;
    vehicleId: string;
    name: string;
    rarity: string;
    grade: string;
    stats: string;
    price: string;
    description: string;
    weapons: string;
    modifications: string;
  }) => {
    try {
      const oldVehicle =
        (await prisma.vehicle.findUnique({
          where: { id: Number(JSON.parse(formData.vehicleId)) },
          include: {
            weapons: { select: { id: true } },
            modifications: { select: { id: true } },
          },
        })) || null;

      const oldWeaponIds =
        oldVehicle?.weapons
          .filter(
            ({ id }: { id: number }) =>
              !JSON.parse(formData.weapons).includes(id),
          )
          .map(({ id }) => id) || [];

      if (oldWeaponIds && oldWeaponIds.length > 0) {
        await prisma.weapon.deleteMany({
          where: { id: { in: oldWeaponIds }, characterInventoryId: null },
        });
      }

      const newWeaponIds = JSON.parse(formData.weapons).filter(
        (id: number) => !oldVehicle?.weapons.some((weapon) => weapon.id === id),
      );

      console.log(newWeaponIds);

      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return JSON.parse(formData.picture);
        }
      };

      const pictureInfo = getPictureInfo();

      const weapons = await prisma.weapon.findMany({
        where: { id: { in: newWeaponIds } },
      });

      const weaponData = weapons.map(
        ({ id, vehicleId, cyberneticId, ...rest }) => ({
          ...rest,
          picture: rest.picture
            ? (rest.picture as Prisma.InputJsonValue)
            : undefined,
          stats: rest.stats
            ? (rest.stats as Prisma.InputJsonValue)
            : Prisma.JsonNull,
          keywords: rest.keywords
            ? (rest.keywords as Prisma.InputJsonValue[])
            : undefined,
        }),
      );

      const mods = await prisma.modification.findMany({
        where: { id: { in: JSON.parse(formData.modifications) } },
      });

      const modData = mods.map(({ id, vehicleId, ...rest }) => ({ ...rest }));

      const newVehicle = await prisma.vehicle.upsert({
        where: { id: Number(JSON.parse(formData.vehicleId)) || 0 },
        update: {
          name: JSON.parse(formData.name),
          rarity: JSON.parse(formData.rarity),
          grade: Number(JSON.parse(formData.grade)),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: Number(JSON.parse(formData.price)),
          description: JSON.parse(formData.description),
          weapons: { create: weaponData },
          modifications: { create: modData },
        },
        create: {
          name: JSON.parse(formData.name),
          rarity: JSON.parse(formData.rarity),
          grade: Number(JSON.parse(formData.grade)),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          weapons: { create: weaponData },
          modifications: { create: modData },
        },
      });

      return newVehicle;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update vehicle');
    }
  },

  createVehicleMod: async (formData: {
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

      console.log(deletedVehicle);

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
