import express from 'express';
import authentication from '../middleware/authentication.js';
import droneController from '../controllers/droneController.js';

const router = express.Router();

router.get('/drones', authentication.authenticate, droneController.getDrones);

router.get(
  '/drones/:droneId',
  authentication.authenticate,
  droneController.getDroneById,
);

router.post(
  '/drones',
  authentication.authenticate,
  authentication.authenticateAdmin,
  droneController.createOrUpdateDrone,
);

router.put(
  '/drones/:droneId',
  authentication.authenticate,
  authentication.authenticateDroneModification,
  droneController.modifyDrone,
);

router.delete(
  '/drones/:droneId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  droneController.deleteDrone,
);

export default router;
