import { Request, Response } from 'express';
import characterServices from '../services/characterServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const characterController = {
  getCharacters: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Could not find authenticated user');
      }
      const characters = await characterServices.getCharacters(req.user.id);
      res.status(200).json(characters);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
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
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getCharacterById: async (req: Request, res: Response) => {
    try {
      const character = await characterServices.getCharacterById(
        req.params.characterId,
      );
      res.status(200).json(character);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
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
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  editCart: async (req: Request, res: Response) => {
    try {
      await characterServices.editCart(
        req.params.characterId,
        req.body.category,
        req.body.itemId,
      );
      res.status(200).json({ message: 'Successfully added item to cart' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  completePurchase: async (req: Request, res: Response) => {
    try {
      await characterServices.addToInventory(req.params.characterId, req.body);
      await characterServices.clearCart(req.params.characterId);
      res.status(200).json({ message: 'Purchase completed' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  clearCart: async (req: Request, res: Response) => {
    try {
      await characterServices.clearCart(req.params.characterId);
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
        const character = await characterServices.createCharacter(
          req.body,
          req.user.id,
        );

        await characterServices.createCharacterCart(character.id);
        await characterServices.createCharacterInventory(character.id);

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
        const character = await characterServices.updateCharacter(
          req.body,
          req.user.id,
          req.params.characterId,
        );
        res.status(200).json(character);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

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
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default characterController;
