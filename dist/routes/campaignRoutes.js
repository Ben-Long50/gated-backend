import express from 'express';
import authentication from '../middleware/authentication.js';
import campaignController from '../controllers/campaignController.js';
const router = express.Router();
router.get('/campaigns', authentication.authenticate, campaignController.getOwnerCampaigns);
router.get('/campaigns/:campaignId', authentication.authenticate, campaignController.getCampaignById);
router.post('/campaigns', authentication.authenticate, campaignController.createCampaign);
router.delete('/campaigns/:campaignId', authentication.authenticate, campaignController.deleteCampaign);
export default router;
