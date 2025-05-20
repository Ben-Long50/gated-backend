import { Request, Response } from 'express';
import itemServices from '../services/itemServices.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import characterServices from '../services/characterServices.js';

const itemController = {
  getItems: async (_req: Request, res: Response) => {
    try {
      const items = await itemServices.getItems();

      res.status(200).json(items);
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

      res.status(200).json(item);
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
        if (!req.user) {
          throw new Error('You must be signed in to complete this action');
        }

        const parsedBody = parseRequestBody(req.body);

        const character = await characterServices.getCharacterById(
          req.params.characterId,
        );

        if (!character) {
          throw new Error(
            'This item must be associated with an existing character to modify it',
          );
        }

        if (character.profits < parsedBody.upgradePrice) {
          throw new Error(
            'You do not have enough profits to purchase the chosen upgrades',
          );
        }
        console.log(character.profits);

        const { upgradePrice, ...itemInfo } = parsedBody;

        await characterServices.updateCharacter(
          {
            profits: character.profits - upgradePrice,
          },
          req.user.id,
          character.id,
        );

        await itemServices.createOrUpdateItem(itemInfo);
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
