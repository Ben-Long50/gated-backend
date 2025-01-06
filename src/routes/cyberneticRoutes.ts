import express from 'express';
import authentication from '../middleware/authentication.js';
import cyberneticController from '../controllers/cyberneticController.js';

const router = express.Router();

router.get(
  '/cybernetics',
  authentication.authenticateUser,
  cyberneticController.getCybernetics,
);

router.get(
  '/cybernetics/:cyberneticId',
  authentication.authenticateUser,
  cyberneticController.getCyberneticById,
);

router.post(
  '/cybernetics',
  authentication.authenticateUser,
  cyberneticController.createCybernetic,
);

router.delete(
  '/cybernetics/:cyberneticId',
  authentication.authenticateUser,
  cyberneticController.deleteCybernetic,
);

export default router;
