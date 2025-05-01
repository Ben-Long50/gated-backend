import express from 'express';
import authentication from '../middleware/authentication.js';
import modificationController from '../controllers/modificationController.js';
const router = express.Router();
router.get('/modifications', authentication.authenticate, modificationController.getModifications);
router.get('/modifications/:modId', authentication.authenticate, modificationController.getModificationById);
router.post('/vehicles/modifications', authentication.authenticate, authentication.authenticateAdmin, modificationController.createOrUpdateModification);
router.delete('/vehicles/modifications/:modId', authentication.authenticate, authentication.authenticateAdmin, modificationController.deleteModification);
export default router;
