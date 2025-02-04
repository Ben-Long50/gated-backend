import { Request, Response } from 'express';
import cyberneticStatServices from '../services/cyberneticStatServices.js';

const cyberneticStatController = {
  editCyberneticPower: async (req: Request, res: Response) => {
    try {
      await cyberneticStatServices.editCyberneticPower(
        req.params.cyberneticId,
        req.body.value,
      );
      res
        .status(200)
        .json({ message: `Changed current power by ${req.body.value}` });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  refreshCyberneticPower: async (req: Request, res: Response) => {
    try {
      await cyberneticStatServices.refreshCyberneticPower(
        req.params.cyberneticId,
      );
      res.status(200).json({ message: `Refreshed cybernetic power` });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default cyberneticStatController;
