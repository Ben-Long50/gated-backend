import express from 'express';
import authentication from '../middleware/authentication.js';
import factionController from '../controllers/factionController.js';
import affiliationController from '../controllers/affiliationController.js';

const router = express.Router();

router.get(
  '/factions/:factionId',
  authentication.authenticate,
  factionController.getFactionById,
);

router.get(
  '/affiliations/:affiliationId',
  authentication.authenticate,
  affiliationController.getAffiliationById,
);

router.patch(
  '/affiliations/:affiliationId/value',
  authentication.authenticate,
  affiliationController.updateAffiliationValue,
);

router.post(
  '/factions/:factionId/affiliations/create',
  authentication.authenticate,
  affiliationController.createFactionAffiliation,
);

router.post(
  '/gangs/:gangId/affiliations/create',
  authentication.authenticate,
  affiliationController.createGangAffiliation,
);

router.post(
  '/characters/:characterId/affiliations/create',
  authentication.authenticate,
  affiliationController.createCharacterAffiliation,
);

router.put(
  '/affiliations/:affiliationId',
  authentication.authenticate,
  affiliationController.updateAffiliationValue,
);

router.delete(
  '/affiliations/:affiliationId',
  authentication.authenticate,
  affiliationController.deleteAffiliation,
);

router.put(
  '/campaigns/:campaignId/factions/:factionId',
  authentication.authenticate,
  factionController.updateFaction,
);

router.delete(
  '/campaigns/:campaignId/factions/:factionId',
  authentication.authenticate,
  factionController.deleteFaction,
);

export default router;
