import express from 'express';
import authentication from '../middleware/authentication.js';
import vehicleController from '../controllers/vehicleController.js';
const router = express.Router();
router.get('/vehicles', authentication.authenticate, vehicleController.getVehicles);
router.get('/vehicles/:vehicleId', authentication.authenticate, vehicleController.getVehicleById);
router.post('/vehicles', authentication.authenticate, authentication.authenticateAdmin, vehicleController.createVehicle);
router.delete('/vehicles/:vehicleId', authentication.authenticate, authentication.authenticateAdmin, vehicleController.deleteVehicle);
export default router;
