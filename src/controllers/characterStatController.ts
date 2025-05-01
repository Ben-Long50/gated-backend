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
        .json({ message: `Changed current health by ${req.body.value}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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
        .json({ message: `Changed current sanity by ${req.body.value}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default characterStatController;
