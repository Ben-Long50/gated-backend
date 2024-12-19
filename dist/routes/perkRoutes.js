import express from 'express';
import authentication from '../middleware/authentication.js';
import perkController from '../controllers/perkController.js';
const router = express.Router();
router.get('/perks', authentication.authenticateUser, perkController.getPerks);
router.post('/perks', authentication.authenticateUser, perkController.createPerk);
export default router;
