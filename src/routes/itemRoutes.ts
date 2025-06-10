import express from 'express';
import authentication from '../middleware/authentication.js';
import itemController from '../controllers/itemController.js';
import itemStatController from '../controllers/itemStatController.js';

const router = express.Router();

router.get('/items', authentication.authenticate, itemController.getBatchItems);

router.get(
  '/items/:category',
  authentication.authenticate,
  itemController.getItems,
);

router.post(
  '/items/:category',
  authentication.authenticate,
  authentication.authenticateAdmin,
  itemController.createOrUpdateItem,
);

router.post(
  '/items/:category/:itemId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  itemController.createItemCopy,
);

router.post(
  '/items/:category/:itemId/conditions',
  authentication.authenticate,
  itemController.createItemConditions,
);

router.put(
  '/items/:category/:itemId/update',
  authentication.authenticate,
  authentication.authenticateItemModification,
  itemController.createOrUpdateItem,
);

router.put(
  '/characters/:characterId/items/:category/:itemId/modify',
  authentication.authenticate,
  authentication.authenticateItemModification,
  itemController.modifyItem,
);

router.patch(
  '/items/:itemId/stats/currentAmmoCount',
  authentication.authenticate,
  itemStatController.editItemAmmo,
);

router.patch(
  '/items/:itemId/stats/currentMagCount',
  authentication.authenticate,
  itemStatController.reloadItem,
);

router.patch(
  '/items/:itemId/stats/refreshAmmo',
  authentication.authenticate,
  itemStatController.refreshAmmo,
);

router.patch(
  '/items/:itemId/stats/currentBlock',
  authentication.authenticate,
  itemStatController.editItemBlock,
);

router.patch(
  '/items/:itemId/stats/refreshBlock',
  authentication.authenticate,
  itemStatController.refreshItemBlock,
);

router.patch(
  '/items/:itemId/stats/currentPower',
  authentication.authenticate,
  itemStatController.editItemPower,
);

router.patch(
  '/items/:itemId/stats/refreshPower',
  authentication.authenticate,
  itemStatController.refreshItemPower,
);

router.patch(
  '/items/:itemId/stats/currentHull',
  authentication.authenticate,
  itemStatController.editItemHull,
);

router.patch(
  '/items/:itemId/stats/currentCargo',
  authentication.authenticate,
  itemStatController.editItemCargo,
);

router.patch(
  '/items/:itemId/stats/currentPass',
  authentication.authenticate,
  itemStatController.editItemPass,
);

router.delete(
  '/items/:category/:itemId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  itemController.deleteItem,
);

export default router;
