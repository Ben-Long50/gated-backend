import express from 'express';
import authentication from '../middleware/authentication.js';
import armorController from '../controllers/armorController.js';
import itemStatController from '../controllers/itemStatController.js';

const router = express.Router();

router.get('/armor', authentication.authenticate, armorController.getArmor);

router.get(
  '/armor/:armorId',
  authentication.authenticate,
  armorController.getArmorById,
);

router.patch(
  '/armor/:itemId/stats/currentPower',
  authentication.authenticate,
  itemStatController.editItemPower,
);

router.patch(
  '/armor/:itemId/stats/currentBlock',
  authentication.authenticate,
  itemStatController.editItemBlock,
);

router.patch(
  '/armor/:itemId/stats/refreshPower',
  authentication.authenticate,
  itemStatController.refreshItemPower,
);

router.patch(
  '/armor/:itemId/stats/refreshBlock',
  authentication.authenticate,
  itemStatController.refreshItemBlock,
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
