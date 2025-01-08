import express from 'express';
import authentication from '../middleware/authentication.js';
import perkController from '../controllers/perkController.js';

const router = express.Router();

router.get('/perks', authentication.authenticate, perkController.getPerks);

router.get(
  '/perks/:perkId',
  authentication.authenticate,
  perkController.getPerkById,
);

router.post(
  '/perks',
  authentication.authenticate,
  authentication.authenticateAdmin,
  perkController.createPerk,
);

export default router;
