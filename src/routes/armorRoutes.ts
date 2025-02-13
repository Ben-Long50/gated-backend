import express from 'express';
import authentication from '../middleware/authentication.js';
import armorController from '../controllers/armorController.js';
import armorStatController from '../controllers/armorStatController.js';

const router = express.Router();

router.get('/armor', authentication.authenticate, armorController.getArmor);

router.get(
  '/armor/:armorId',
  authentication.authenticate,
  armorController.getArmorById,
);

router.patch(
  '/armor/:armorId/stats/currentPower',
  authentication.authenticate,
  armorStatController.editArmorPower,
);

router.patch(
  '/armor/:armorId/stats/currentBlock',
  authentication.authenticate,
  armorStatController.editArmorBlock,
);

router.patch(
  '/armor/:armorId/stats/refreshPower',
  authentication.authenticate,
  armorStatController.refreshArmorPower,
);

router.patch(
  '/armor/:armorId/stats/refreshBlock',
  authentication.authenticate,
  armorStatController.refreshArmorBlock,
);

router.post(
  '/armor',
  authentication.authenticate,
  authentication.authenticateAdmin,
  armorController.createOrUpdateArmor,
);

router.put(
  '/armor/:armorId',
  authentication.authenticate,
  authentication.authenticateArmorModification,
  armorController.modifyArmor,
);

router.delete(
  '/armor/:armorId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  armorController.deleteArmor,
);

export default router;
