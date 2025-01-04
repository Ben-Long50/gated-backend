import express from 'express';
import authentication from '../middleware/authentication.js';
import actionConroller from '../controllers/actionController.js';

const router = express.Router();

router.get(
  '/actions',
  authentication.authenticateUser,
  actionConroller.getActions,
);

router.post(
  '/actions',
  authentication.authenticateUser,
  actionConroller.createAction,
);

export default router;
