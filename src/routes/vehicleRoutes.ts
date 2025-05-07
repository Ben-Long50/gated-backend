import express from 'express';
import authentication from '../middleware/authentication.js';
import vehicleController from '../controllers/vehicleController.js';
import vehicleStatController from '../controllers/vehicleStatController.js';

const router = express.Router();

router.get(
  '/vehicles',
  authentication.authenticate,
  vehicleController.getVehicles,
);

router.get(
  '/vehicles/:vehicleId',
  authentication.authenticate,
  vehicleController.getVehicleById,
);

router.patch(
  '/vehicles/:vehicleId/stats/currentHull',
  authentication.authenticate,
  vehicleStatController.editVehicleHull,
);

router.patch(
  '/vehicles/:vehicleId/stats/currentCargo',
  authentication.authenticate,
  vehicleStatController.editVehicleCargo,
);

router.patch(
  '/vehicles/:vehicleId/stats/currentPass',
  authentication.authenticate,
  vehicleStatController.editVehiclePass,
);

router.post(
  '/vehicles',
  authentication.authenticate,
  authentication.authenticateAdmin,
  vehicleController.createOrUpdateVehicle,
);

router.put(
  '/vehicles/:vehicleId',
  authentication.authenticate,
  authentication.authenticateVehicleModification,
  vehicleController.modifyVehicle,
);

router.delete(
  '/vehicles/:vehicleId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  vehicleController.deleteVehicle,
);

export default router;
