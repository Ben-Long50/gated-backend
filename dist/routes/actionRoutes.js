import express from 'express';
import authentication from '../middleware/authentication.js';
import actionConroller from '../controllers/actionController.js';
const router = express.Router();
router.get('/actions', authentication.authenticate, actionConroller.getActions);
router.get('/actions/:actionId', authentication.authenticate, actionConroller.getActionById);
router.post('/actions', authentication.authenticate, authentication.authenticateAdmin, actionConroller.createAction);
export default router;
