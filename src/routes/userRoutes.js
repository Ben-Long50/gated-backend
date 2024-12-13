import express from 'express';
import cors from 'cors';
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/users', cors(), authMiddleware, userController.getUsers);

router.post('/users', cors(), authMiddleware, userController.createUser);

router.get('/users/:userId', cors(), userController.getUser);

export default router;
