import express from 'express';
import authentication from '../middleware/authentication.js';
import actionController from '../controllers/actionController.js';
const router = express.Router();
router.get('/actions', authentication.authenticate, actionController.getActions);
router.get('/actions/:actionId', authentication.authenticate, actionController.getActionById);
router.post('/actions', authentication.authenticate, authentication.authenticateAdmin, actionController.createAction);
router.delete('/actions/:actionId', authentication.authenticate, authentication.authenticateAdmin, actionController.deleteAction);
export default router;
