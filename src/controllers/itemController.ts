import { Request, Response } from 'express';
import itemServices from '../services/itemServices.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import { destructureLinkReference } from '../utils/destructureItemLinks.js';

const itemController = {
  getItems: async (_req: Request, res: Response) => {
    try {
      const items = await itemServices.getItems();

      const itemData = items.map((item) => destructureLinkReference(item));

      res.status(200).json(itemData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getItemById: async (req: Request, res: Response) => {
    try {
      const item = await itemServices.getItemById(req.params.itemId);

      if (!item) {
        throw new Error('Item not found');
      }

      const itemData = destructureLinkReference(item);

      res.status(200).json(itemData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrUpdateItem: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await itemServices.createOrUpdateItem(parsedBody);

        res.status(200).json({
          message: parsedBody.id
            ? 'Successfully updated item'
            : 'Successfully created item',
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  modifyItem: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await itemServices.createOrUpdateItem(parsedBody);
        res.status(200).json({ message: 'Successfully modified item' });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteItem: async (req: Request, res: Response) => {
    try {
      await itemServices.deleteItem(req.params.itemId);
      res.status(200).json({ message: 'Successfully deleted item' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default itemController;
