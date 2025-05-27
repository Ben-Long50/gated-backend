import { Request, Response } from 'express';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import itemServices from '../services/itemServices.js';

const armorController = {
  getArmor: async (_req: Request, res: Response) => {
    try {
      const armors = await itemServices.getItems(['armor']);

      res.status(200).json(armors);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getArmorById: async (req: Request, res: Response) => {
    try {
      const armor = await itemServices.getItemById(
        'armor',
        Number(req.params.armorId),
      );

      res.status(200).json(armor);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrUpdateArmor: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await itemServices.createOrUpdateItem(parsedBody, 'armor');
        res.status(200).json({
          message: req.body.armorId
            ? 'Successfully updated armor'
            : 'Successfully created armor',
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  modifyArmor: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await itemServices.createOrUpdateItem(parsedBody, 'armor');
        res.status(200).json({ message: 'Successfully modified armor' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteArmor: async (req: Request, res: Response) => {
    try {
      await itemServices.deleteItem(Number(req.params.armorId));
      res.status(200).json({ message: 'Successfully deleted armor' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default armorController;
