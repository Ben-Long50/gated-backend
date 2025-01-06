import express from 'express';
import authentication from '../middleware/authentication.js';
import errorController from '../controllers/errorController.js';

const router = express.Router();

router.get(
  '/errors',
  authentication.authenticateUser,
  errorController.getErrorReports,
);

router.post(
  '/errors',
  authentication.authenticateUser,
  errorController.createErrorReport,
);

export default router;
