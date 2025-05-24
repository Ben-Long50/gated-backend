import express from 'express';
import authentication from '../middleware/authentication.js';
import cyberneticController from '../controllers/cyberneticController.js';
import itemStatController from '../controllers/itemStatController.js';

const router = express.Router();

router.get(
  '/cybernetics',
  authentication.authenticate,
  cyberneticController.getCybernetics,
);

router.get(
  '/cybernetics/:cyberneticId',
  authentication.authenticate,
  cyberneticController.getCyberneticById,
);

router.patch(
  '/cybernetics/:itemId/stats/currentPower',
  authentication.authenticate,
  itemStatController.editItemPower,
);

router.patch(
  '/cybernetics/:itemId/stats/refreshPower',
  authentication.authenticate,
  itemStatController.refreshItemPower,
);

router.post(
  '/cybernetics',
  authentication.authenticate,
  authentication.authenticateAdmin,
  cyberneticController.createOrUpdateCybernetic,
);

router.put(
  '/cybernetics/:cyberneticId',
  authentication.authenticate,
  authentication.authenticateCyberneticModification,
  cyberneticController.modifyCybernetic,
);

router.delete(
  '/cybernetics/:cyberneticId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  cyberneticController.deleteCybernetic,
);

export default router;
