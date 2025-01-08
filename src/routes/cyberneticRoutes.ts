import express from 'express';
import authentication from '../middleware/authentication.js';
import cyberneticController from '../controllers/cyberneticController.js';

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

router.post(
  '/cybernetics',
  authentication.authenticate,
  authentication.authenticateAdmin,
  cyberneticController.createCybernetic,
);

router.delete(
  '/cybernetics/:cyberneticId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  cyberneticController.deleteCybernetic,
);

export default router;
