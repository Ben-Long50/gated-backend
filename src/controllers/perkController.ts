import { Request, Response } from 'express';
import perkServices from '../services/perkServices.js';

const perkController = {
  getPerks: async (_req: Request, res: Response) => {
    try {
      const perks = await perkServices.getPerks();
      res.status(200).json(perks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getPerkById: async (req: Request, res: Response) => {
    try {
      const perk = await perkServices.getPerkById(req.params.perkId);
      res.status(200).json(perk);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createPerk: async (req: Request, res: Response) => {
    try {
      const perk = await perkServices.createPerk(req.body);
      res.status(200).json(perk);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePerk: async (req: Request, res: Response) => {
    try {
      await perkServices.deletePerk(req.params.perkId);
      res.status(200).json({ message: 'Successfully deleted perk' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default perkController;
