import express from 'express';
import authentication from '../middleware/authentication.js';
import armorController from '../controllers/armorController.js';
const router = express.Router();
router.get('/armor', authentication.authenticateUser, armorController.getArmor);
router.get('/armor/:armorId', authentication.authenticateUser, armorController.getArmorById);
router.post('/armor', authentication.authenticateUser, armorController.createArmor);
router.delete('/armor/:armorId', authentication.authenticateUser, armorController.deleteArmor);
export default router;
