import express from 'express';
import authentication from '../middleware/authentication.js';
import conditionController from '../controllers/conditionController.js';

const router = express.Router();

router.get(
  '/conditions',
  authentication.authenticate,
  conditionController.getConditions,
);

router.get(
  '/conditions/:conditionId',
  authentication.authenticate,
  conditionController.getConditionById,
);

router.post(
  '/conditions',
  authentication.authenticate,
  authentication.authenticateAdmin,
  conditionController.createCondition,
);

router.delete(
  '/conditions/:conditionId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  conditionController.deleteCondition,
);

export default router;
