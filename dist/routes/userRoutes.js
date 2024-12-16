import express from 'express';
import userController from '../controllers/userController.js';
import authentication from '../middleware/authentication.js';
const router = express.Router();
router.get('/users/authenticated', authentication.authenticateUser, userController.getAuthenticatedUser);
router.get('/users', authentication.authenticateUser, userController.getUsers);
router.post('/users', authentication.authenticateUser, userController.createUser);
router.get('/users/:userId', userController.getUser);
export default router;
