import express from 'express';
import authentication from '../middleware/authentication.js';
import armorController from '../controllers/armorController.js';
const router = express.Router();
router.get('/armor', authentication.authenticate, armorController.getArmor);
router.get('/armor/:armorId', authentication.authenticate, armorController.getArmorById);
router.post('/armor', authentication.authenticate, authentication.authenticateAdmin, armorController.createArmor);
router.delete('/armor/:armorId', authentication.authenticate, authentication.authenticateAdmin, armorController.deleteArmor);
export default router;
