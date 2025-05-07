import { Request, Response } from 'express';
import vehicleStatServices from '../services/vehicleStatServices.js';

const vehicleStatController = {
  editVehicleHull: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('You must be logged in to perform this action');
      }

      await vehicleStatServices.editVehicleHull(
        req.params.vehicleId,
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

  editVehicleCargo: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('You must be logged in to perform this action');
      }

      await vehicleStatServices.editVehicleCargo(
        req.params.vehicleId,
        req.body.value,
        req.user.id,
      );
      res
        .status(200)
        .json({ message: `Changed current cargo count by ${req.body.value}` });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  editVehiclePass: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('You must be logged in to perform this action');
      }

      await vehicleStatServices.editVehiclePass(
        req.params.vehicleId,
        req.body.value,
        req.user.id,
      );
      res.status(200).json({
        message: `Changed current passenger count by ${req.body.value}`,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default vehicleStatController;
