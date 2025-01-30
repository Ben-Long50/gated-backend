import { Request, Response } from 'express';
import vehicleServices from '../services/vehicleServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import { $Enums } from '@prisma/client';
import { VehicleStats } from '../types/vehicle.js';

const vehicleController = {
  getVehicles: async (_req: Request, res: Response) => {
    try {
      const vehicles = await vehicleServices.getVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getVehicleMods: async (_req: Request, res: Response) => {
    try {
      const vehicleMods = await vehicleServices.getVehicleMods();
      res.status(200).json(vehicleMods);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getVehicleById: async (req: Request, res: Response) => {
    try {
      const vehicle = await vehicleServices.getVehicleById(
        req.params.vehicleId,
      );
      res.status(200).json(vehicle);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getVehicleModById: async (req: Request, res: Response) => {
    try {
      const vehicleMod = await vehicleServices.getVehicleModById(
        req.params.modId,
      );
      res.status(200).json(vehicleMod);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createVehicle: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = Object.fromEntries(
          Object.entries(req.body as FormData).map(([key, value]) => {
            try {
              return [key, JSON.parse(value)];
            } catch {
              return [key, value];
            }
          }),
        ) as {
          publicId?: string;
          imageUrl?: string;
          picture?: { publicId: string; imageUrl: string };
          vehicleId: string;
          name: string;
          rarity: $Enums.ItemRarity;
          grade: number;
          stats: Partial<VehicleStats>;
          price: number;
          description: string;
          weapons: number[];
          modifications: number[];
        };

        const vehicle = await vehicleServices.createVehicle(parsedBody);
        res.status(200).json(vehicle);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  createVehicleMod: async (req: Request, res: Response) => {
    try {
      const vehicleMod = await vehicleServices.createVehicleMod(req.body);
      res.status(200).json(vehicleMod);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  deleteVehicle: async (req: Request, res: Response) => {
    try {
      await vehicleServices.deleteVehicle(req.params.vehicleId);
      res.status(200).json({ message: 'Successfully deleted vehicle' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  deleteVehicleMod: async (req: Request, res: Response) => {
    try {
      await vehicleServices.deleteVehicleMod(req.params.modId);
      res
        .status(200)
        .json({ message: 'Successfully deleted vehicle modification' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default vehicleController;
