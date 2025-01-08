import express from 'express';
import authentication from '../middleware/authentication.js';
import weaponController from '../controllers/weaponController.js';
const router = express.Router();
router.get('/weapons', authentication.authenticate, weaponController.getWeapons);
router.get('/weapons/:weaponId', authentication.authenticate, weaponController.getWeaponById);
router.post('/weapons', authentication.authenticate, authentication.authenticateAdmin, weaponController.createWeapon);
router.delete('/weapons/:weaponId', authentication.authenticate, authentication.authenticateAdmin, weaponController.deleteWeapon);
export default router;
