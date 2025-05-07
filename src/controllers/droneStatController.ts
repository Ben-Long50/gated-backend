import { Request, Response } from 'express';
import droneStatServices from '../services/droneStatServices.js';

const droneStatController = {
  editDroneHull: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('You must be logged in to perform this action');
      }

      await droneStatServices.editDroneHull(
        req.params.droneId,
        req.body.value,
        req.user.id,
      );
      res
        .status(200)
        .json({ message: `Changed current hull by ${req.body.value}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  editDronePower: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('You must be logged in to perform this action');
      }

      await droneStatServices.editDronePower(
        req.params.droneId,
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
};

export default droneStatController;
