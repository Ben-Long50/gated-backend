import express from 'express';
import authentication from '../middleware/authentication.js';
import itemController from '../controllers/itemController.js';
import itemStatController from '../controllers/itemStatController.js';

const router = express.Router();

router.get(
  '/items/:category',
  authentication.authenticate,
  itemController.getItems,
);

router.get(
  '/items/:category/:itemId',
  authentication.authenticate,
  itemController.getItemById,
);

router.patch(
  '/items/:category/:itemId/stats/currentPower',
  authentication.authenticate,
  itemStatController.editItemPower,
);

router.patch(
  '/items/:category/:itemId/stats/refreshPower',
  authentication.authenticate,
  itemStatController.refreshItemPower,
);

router.post(
  '/items/:category',
  authentication.authenticate,
  authentication.authenticateAdmin,
  itemController.createOrUpdateItem,
);

router.put(
  '/characters/:characterId/items/:category/:itemId/modify',
  authentication.authenticate,
  authentication.authenticateItemModification,
  itemController.modifyItem,
);

router.delete(
  '/items/:category/:itemId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  itemController.deleteItem,
);

export default router;
