import express from 'express';
import authentication from '../middleware/authentication.js';
import weaponController from '../controllers/weaponController.js';
import weaponStatController from '../controllers/weaponStatController.js';

const router = express.Router();

router.get(
  '/weapons',
  authentication.authenticate,
  weaponController.getWeapons,
);

router.get(
  '/weapons/:weaponId',
  authentication.authenticate,
  weaponController.getWeaponById,
);

router.patch(
  '/weapons/:weaponId/stats/currentAmmoCount',
  authentication.authenticate,
  weaponStatController.editWeaponAmmo,
);

router.patch(
  '/weapons/:weaponId/stats/currentMagCount',
  authentication.authenticate,
  weaponStatController.reloadWeapon,
);

router.patch(
  '/weapons/:weaponId/stats/refreshAmmo',
  authentication.authenticate,
  weaponStatController.refreshAmmo,
);

router.post(
  '/weapons',
  authentication.authenticate,
  authentication.authenticateAdmin,
  weaponController.createOrUpdateWeapon,
);

router.put(
  '/weapons/:weaponId',
  authentication.authenticate,
  authentication.authenticateWeaponModification,
  weaponController.modifyWeapon,
);

router.delete(
  '/weapons/:weaponId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  weaponController.deleteWeapon,
);

export default router;
