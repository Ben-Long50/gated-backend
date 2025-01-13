import express from 'express';
import authentication from '../middleware/authentication.js';
import vehicleController from '../controllers/vehicleController.js';

const router = express.Router();

router.get(
  '/vehicles',
  authentication.authenticate,
  vehicleController.getVehicles,
);

router.get(
  '/vehicles/modifications',
  authentication.authenticate,
  vehicleController.getVehicleMods,
);

router.get(
  '/vehicles/:vehicleId',
  authentication.authenticate,
  vehicleController.getVehicleById,
);

router.get(
  '/vehicles/modifications/:modId',
  authentication.authenticate,
  vehicleController.getVehicleModById,
);

router.post(
  '/vehicles',
  authentication.authenticate,
  authentication.authenticateAdmin,
  vehicleController.createVehicle,
);

router.post(
  '/vehicles/modifications',
  authentication.authenticate,
  authentication.authenticateAdmin,
  vehicleController.createVehicleMod,
);

router.delete(
  '/vehicles/:vehicleId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  vehicleController.deleteVehicle,
);

router.delete(
  '/vehicles/modifications/:modId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  vehicleController.deleteVehicleMod,
);

export default router;
