import express from 'express';
import userController from '../controllers/userController.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.get(
  '/users/authenticated',
  authentication.authenticate,
  userController.getAuthenticatedUser,
);

router.get('/users', authentication.authenticate, userController.getUsers);

router.post('/users', authentication.authenticate, userController.createUser);

router.put('/users', authentication.authenticate, userController.updateUser);

router.patch(
  '/users/:userId/role',
  authentication.authenticate,
  authentication.authenticateSuperadmin,
  userController.updateUserRole,
);

router.get('/users/:userId', userController.getUser);

export default router;
