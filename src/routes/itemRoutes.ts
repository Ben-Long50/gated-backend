import express from 'express';
import authentication from '../middleware/authentication.js';
import itemController from '../controllers/itemController.js';
import itemStatController from '../controllers/itemStatController.js';

const router = express.Router();

router.get('/items', authentication.authenticate, itemController.getItems);

router.get(
  '/items/:itemId',
  authentication.authenticate,
  itemController.getItemById,
);

router.patch(
  '/items/:itemId/stats/currentPower',
  authentication.authenticate,
  itemStatController.editItemPower,
);

router.patch(
  '/items/:itemId/stats/currentStacks',
  authentication.authenticate,
  itemStatController.editItemStacks,
);

router.patch(
  '/items/:itemId/stats/refreshPower',
  authentication.authenticate,
  itemStatController.refreshItemPower,
);

router.patch(
  '/items/:itemId/stats/refreshStacks',
  authentication.authenticate,
  itemStatController.refreshItemStacks,
);

router.post(
  '/items',
  authentication.authenticate,
  authentication.authenticateAdmin,
  itemController.createOrUpdateItem,
);

router.put(
  '/items/:itemId',
  authentication.authenticate,
  authentication.authenticateItemModification,
  itemController.modifyItem,
);

router.delete(
  '/items/:itemId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  itemController.deleteItem,
);

export default router;
