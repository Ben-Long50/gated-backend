import { Request, Response } from 'express';
import cyberneticStatServices from '../services/cyberneticStatServices.js';

const cyberneticStatController = {
  editCyberneticPower: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('You must be logged in to perform this action');
      }

      await cyberneticStatServices.editCyberneticPower(
        req.params.cyberneticId,
        req.body.value,
        req.user.id,
      );
      res
        .status(200)
        .json({ message: `Changed current power by ${req.body.value}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  refreshCyberneticPower: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('You must be logged in to perform this action');
      }

      await cyberneticStatServices.refreshCyberneticPower(
        req.params.cyberneticId,
        req.user.id,
      );
      res.status(200).json({ message: `Refreshed cybernetic power` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cyberneticStatController;
