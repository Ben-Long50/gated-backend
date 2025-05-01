import { Request, Response } from 'express';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import { destructureLinkReference } from '../utils/destructureItemLinks.js';
import droneServices from '../services/droneServices.js';

const droneController = {
  getDrones: async (_req: Request, res: Response) => {
    try {
      const drones = await droneServices.getDrones();

      const droneData = drones.map((drone) => destructureLinkReference(drone));

      res.status(200).json(droneData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getDroneById: async (req: Request, res: Response) => {
    try {
      const drone = await droneServices.getDroneById(req.params.droneId);

      if (!drone) {
        throw new Error('Failed to find drone');
      }

      const droneData = destructureLinkReference(drone);

      res.status(200).json(droneData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrUpdateDrone: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await droneServices.createOrUpdateDrone(parsedBody);
        res.status(200).json({
          message: req.body.droneId
            ? 'Successfully updated drone'
            : 'Successfully created drone',
        });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  modifyDrone: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await droneServices.createOrUpdateDrone(parsedBody);
        res.status(200).json({ message: 'Successfully modified drone' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteDrone: async (req: Request, res: Response) => {
    try {
      await droneServices.deleteDrone(req.params.droneId);
      res.status(200).json({ message: 'Successfully deleted drone' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default droneController;
