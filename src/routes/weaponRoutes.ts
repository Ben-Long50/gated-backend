import express from 'express';
import authentication from '../middleware/authentication.js';
import weaponController from '../controllers/weaponController.js';

const router = express.Router();

router.get(
  '/weapons',
  authentication.authenticateUser,
  weaponController.getWeapons,
);

router.get(
  '/weapons/:weaponId',
  authentication.authenticateUser,
  weaponController.getWeaponById,
);

router.post(
  '/weapons',
  authentication.authenticateUser,
  weaponController.createWeapon,
);

router.put(
  '/weapons/:weaponId',
  authentication.authenticateUser,
  weaponController.updateWeapon,
);

router.delete(
  '/weapons/:weaponId',
  authentication.authenticateUser,
  weaponController.deleteWeapon,
);

export default router;
