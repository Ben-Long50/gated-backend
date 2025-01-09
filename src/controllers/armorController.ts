import { Request, Response } from 'express';
import armorServices from '../services/armorServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const armorController = {
  getArmor: async (_req: Request, res: Response) => {
    try {
      const armors = await armorServices.getArmor();
      res.status(200).json(armors);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getArmorById: async (req: Request, res: Response) => {
    try {
      const armor = await armorServices.getArmorById(req.params.armorId);
      res.status(200).json(armor);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createArmor: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const armor = await armorServices.createArmor(req.body);
        res.status(200).json(armor);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  deleteArmorByName: async (req: Request, res: Response) => {
    try {
      await armorServices.deleteArmorByName(req.params.armorId);
      res.status(200).json({ message: 'Successfully deleted armor' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  deleteArmor: async (req: Request, res: Response) => {
    try {
      await armorServices.deleteArmor(req.params.armorId);
      res.status(200).json({ message: 'Successfully deleted armor' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default armorController;
