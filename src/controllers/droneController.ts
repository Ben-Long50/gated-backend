import { Request, Response } from 'express';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import itemServices from '../services/itemServices.js';

const droneController = {
  getDrones: async (_req: Request, res: Response) => {
    try {
      const drones = await itemServices.getItems(['drone']);

      res.status(200).json(drones);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getDroneById: async (req: Request, res: Response) => {
    try {
      const drone = await itemServices.getItemById(
        'drone',
        Number(req.params.droneId),
      );

      if (!drone) {
        throw new Error('Failed to find drone');
      }

      res.status(200).json(drone);
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

        await itemServices.createOrUpdateItem(parsedBody, 'drone');
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

        await itemServices.createOrUpdateItem(parsedBody, 'drone');
        res.status(200).json({ message: 'Successfully modified drone' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteDrone: async (req: Request, res: Response) => {
    try {
      await itemServices.deleteItem(Number(req.params.droneId));
      res.status(200).json({ message: 'Successfully deleted drone' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default droneController;
