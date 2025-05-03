import express from 'express';
import authentication from '../middleware/authentication.js';
import modificationController from '../controllers/modificationController.js';
const router = express.Router();
router.get('/modifications', authentication.authenticate, modificationController.getModifications);
router.get('/modifications/:modId', authentication.authenticate, modificationController.getModificationById);
router.post('/modifications', authentication.authenticate, authentication.authenticateAdmin, modificationController.createOrUpdateModification);
router.delete('/modifications/:modId', authentication.authenticate, authentication.authenticateAdmin, modificationController.deleteModification);
export default router;
