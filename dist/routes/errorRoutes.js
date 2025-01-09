import express from 'express';
import authentication from '../middleware/authentication.js';
import errorController from '../controllers/errorController.js';
const router = express.Router();
router.get('/errors', authentication.authenticateSuperadmin, errorController.getErrorReports);
router.post('/errors', authentication.authenticate, errorController.createErrorReport);
router.delete('/errors/:errorId', authentication.authenticateSuperadmin, errorController.deleteErrorReport);
export default router;
