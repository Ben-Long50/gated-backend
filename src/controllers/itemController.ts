import { Request, Response } from 'express';
import itemServices from '../services/itemServices.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { Item } from '../types/item.js';

const itemController = {
  getItems: async (_req: Request, res: Response) => {
    try {
      const items = await itemServices.getItems();
      res.status(200).json(items);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getItemById: async (req: Request, res: Response) => {
    try {
      const item = await itemServices.getItemById(req.params.itemId);
      res.status(200).json(item);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createItem: [
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
        ) as Item;

        await itemServices.createItem(parsedBody);
        res.status(200).json({ message: 'Successfully created item' });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  deleteItem: async (req: Request, res: Response) => {
    try {
      await itemServices.deleteItem(req.params.itemId);
      res.status(200).json({ message: 'Successfully deleted item' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default itemController;
