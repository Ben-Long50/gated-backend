import { Request, Response } from 'express';
import characterStatServices from '../services/characterStatServices.js';

const characterStatController = {
  editCurrentHealth: async (req: Request, res: Response) => {
    try {
      await characterStatServices.editCurrentHealth(
        req.params.characterId,
        req.body.value,
      );
      res
        .status(200)
        .json({ message: `changed current health by ${req.body.value}` });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
  editCurrentSanity: async (req: Request, res: Response) => {
    try {
      await characterStatServices.editCurrentSanity(
        req.params.characterId,
        req.body.value,
      );
      res
        .status(200)
        .json({ message: `changed current sanity by ${req.body.value}` });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default characterStatController;
