import { Request, Response } from 'express';
import vehicleServices from '../services/vehicleServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';

const vehicleController = {
  getVehicles: async (_req: Request, res: Response) => {
    try {
      const vehicles = await vehicleServices.getVehicles();

      res.status(200).json(vehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getVehicleById: async (req: Request, res: Response) => {
    try {
      const vehicle = await vehicleServices.getVehicleById(
        req.params.vehicleId,
      );

      res.status(200).json(vehicle);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrUpdateVehicle: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await vehicleServices.createOrUpdateVehicle(parsedBody);
        res.status(200).json({
          message: req.body.vehicleId
            ? 'Successfully updated vehicle'
            : 'Successfully created vehicle',
        });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  modifyVehicle: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await vehicleServices.createOrUpdateVehicle(parsedBody);
        res.status(200).json({ message: 'Successfully modified vehicle' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteVehicle: async (req: Request, res: Response) => {
    try {
      await vehicleServices.deleteVehicle(req.params.vehicleId);
      res.status(200).json({ message: 'Successfully deleted vehicle' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default vehicleController;
