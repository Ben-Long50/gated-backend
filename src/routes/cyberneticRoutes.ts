import express from 'express';
import authentication from '../middleware/authentication.js';
import cyberneticController from '../controllers/cyberneticController.js';
import cyberneticStatController from '../controllers/cyberneticStatController.js';

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
  '/cybernetics/:cyberneticId/stats/currentPower',
  authentication.authenticate,
  cyberneticStatController.editCyberneticPower,
);

router.patch(
  '/cybernetics/:cyberneticId/stats/refreshPower',
  authentication.authenticate,
  cyberneticStatController.refreshCyberneticPower,
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
