import express from 'express';
import authentication from '../middleware/authentication.js';
import sessionController from '../controllers/sessionController.js';

const router = express.Router();

router.get(
  '/campaigns/:campaignId/sessions',
  authentication.authenticate,
  sessionController.getCampaignSessions,
);

router.get(
  '/campaigns/:campaignId/sessions/:sessionId',
  authentication.authenticate,
  sessionController.getSessionById,
);

router.post(
  '/campaigns/:campaignId/sessions',
  authentication.authenticate,
  sessionController.createOrUpdateSession,
);

router.delete(
  '/campaigns/:campaignId/sessions/:sessionId',
  authentication.authenticate,
  sessionController.deleteSession,
);

export default router;
