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
      });

      const vehicleDetails = await getGroupWeapons(vehicles);

      return vehicleDetails;
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

      const newVehicle = await prisma.vehicle.upsert({
        where: { id: Number(JSON.parse(formData.vehicleId)) || 0 },
        update: {
          name: JSON.parse(formData.name),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: Number(JSON.parse(formData.price)),
          description: JSON.parse(formData.description),
          weapons: JSON.parse(formData.weapons),
        },
        create: {
          name: JSON.parse(formData.name),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          weapons: JSON.parse(formData.weapons),
        },
      });

      return newVehicle;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update vehicle');
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
};

export default vehicleServices;
