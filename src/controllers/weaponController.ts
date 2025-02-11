import { Request, Response } from 'express';
import weaponServices from '../services/weaponServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const weaponController = {
  getWeapons: async (_req: Request, res: Response) => {
    try {
      const weapons = await weaponServices.getWeapons();
      res.status(200).json(weapons);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getWeaponById: async (req: Request, res: Response) => {
    try {
      const weapon = await weaponServices.getWeaponById(req.params.weaponId);
      res.status(200).json(weapon);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createWeapon: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const weapon = await weaponServices.createWeapon(req.body);
        res.status(200).json(weapon);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  deleteWeapon: async (req: Request, res: Response) => {
    try {
      await weaponServices.deleteWeapon(req.params.weaponId);
      res.status(200).json({ message: 'Successfully deleted weapon' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default weaponController;
