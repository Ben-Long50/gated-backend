import { Request, Response } from 'express';
import characterServices from '../services/characterServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import cartServices from '../services/cartServices.js';

const characterController = {
  getCharacters: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Could not find authenticated user');
      }
      const characters = await characterServices.getCharacters(req.user.id);
      res.status(200).json(characters);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getActiveCharacter: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Could not find authenticated user');
      }
      const activeCharacter = await characterServices.getActiveCharacter(
        req.user.id,
      );
      res.status(200).json(activeCharacter);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getCharacterById: async (req: Request, res: Response) => {
    try {
      const character = await characterServices.getCharacterById(
        req.params.characterId,
      );
      res.status(200).json(character);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  setActiveCharacter: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Could not find authenticated user');
      }
      const activeCharacter = await characterServices.setActiveCharacter(
        req.user.id,
        req.body.characterId,
      );
      res.status(200).json(activeCharacter);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  toggleEquipment: async (req: Request, res: Response) => {
    try {
      await characterServices.toggleEquipment(
        req.params.inventoryId,
        req.params.itemId,
        req.body.category,
      );
      res.status(200).json({ message: 'Successfully toggled equipment' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  editCart: async (req: Request, res: Response) => {
    try {
      await cartServices.editCartItem(
        Number(req.params.cartId),
        Number(req.body.itemId),
        Number(req.body.value),
      );

      res.status(200).json({ message: 'Successfully added item to cart' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  completePurchase: async (req: Request, res: Response) => {
    try {
      await characterServices.addToInventory(
        Number(req.params.characterId),
        Number(req.params.inventoryId),
      );
      await characterServices.clearCart(Number(req.params.characterId));
      res.status(200).json({ message: 'Purchase completed' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  clearCart: async (req: Request, res: Response) => {
    try {
      await characterServices.clearCart(Number(req.params.characterId));
      res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {}
  },

  createCharacter: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          throw new Error('Could not find authenticated user');
        }

        const parsedBody = parseRequestBody(req.body);

        const character = await characterServices.createCharacter(
          parsedBody,
          req.user.id,
        );

        res.status(200).json(character);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  updateCharacter: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          throw new Error('Could not find authenticated user');
        }

        const parsedBody = parseRequestBody(req.body);

        const character = await characterServices.updateCharacter(
          parsedBody,
          req.user.id,
          Number(req.params.characterId),
        );
        res.status(200).json(character);
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  createCharacterConditions: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Could not find authenticated user');
      }

      await characterServices.createCharacterConditions(
        req.user.id,
        Number(req.params.characterId),
        req.body,
      );

      res
        .status(200)
        .json({ message: 'Successfully created character conditions' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCharacter: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Could not find authenticated user');
      }
      await characterServices.deleteCharacter(
        req.user.id,
        req.params.characterId,
      );
      res.status(200).json({ message: 'Successfully deleted character' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default characterController;
