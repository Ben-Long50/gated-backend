import express from 'express';
import authentication from '../middleware/authentication.js';
import errorController from '../controllers/errorController.js';
const router = express.Router();
router.get('/errors', authentication.authenticate, errorController.getErrorReports);
router.post('/errors', authentication.authenticate, errorController.createErrorReport);
export default router;
