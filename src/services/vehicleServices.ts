import prisma from '../config/database.js';
import {
  getGroupWeapons,
  getItemWeapons,
} from '../utils/getAssociatedWeapons.js';

const vehicleServices = {
  getVehicles: async () => {
    try {
      const vehicles = await prisma.vehicle.findMany({
        orderBy: { name: 'asc' },
        include: { modifications: true },
      });

      const vehicleDetails = await getGroupWeapons(vehicles);

      return vehicleDetails;
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
        include: { modifications: true },
      });

      if (!vehicle) {
        throw new Error('Could not find vehicle');
      }

      const vehicleDetails = await getItemWeapons(vehicle);

      return vehicleDetails;
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
    stats: string;
    price: string;
    description: string;
    weapons: string;
    modifications: string;
  }) => {
    try {
      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return JSON.parse(formData.picture);
        }
      };

      const pictureInfo = getPictureInfo();

      const modIds = JSON.parse(formData.modifications).map((modId: number) => {
        return { id: modId };
      });

      const newVehicle = await prisma.vehicle.upsert({
        where: { id: Number(JSON.parse(formData.vehicleId)) || 0 },
        update: {
          name: JSON.parse(formData.name),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: Number(JSON.parse(formData.price)),
          description: JSON.parse(formData.description),
          weapons: JSON.parse(formData.weapons),
          modifications: { connect: modIds },
        },
        create: {
          name: JSON.parse(formData.name),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          weapons: JSON.parse(formData.weapons),
          modifications: { connect: modIds },
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

  deleteVehicleByName: async (vehicleName: string) => {
    try {
      await prisma.vehicle.delete({
        where: {
          name: vehicleName,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete vehicle');
    }
  },

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
