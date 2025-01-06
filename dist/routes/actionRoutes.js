import express from 'express';
import authentication from '../middleware/authentication.js';
import actionConroller from '../controllers/actionController.js';
const router = express.Router();
router.get('/actions', authentication.authenticateUser, actionConroller.getActions);
router.get('/actions/:actionId', authentication.authenticateUser, actionConroller.getActionById);
router.post('/actions', authentication.authenticateUser, actionConroller.createAction);
export default router;
