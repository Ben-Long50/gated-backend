import express from 'express';
import authentication from '../middleware/authentication.js';
import notificationController from '../controllers/notificationController.js';

const router = express.Router();

router.get(
  '/notifications',
  authentication.authenticate,
  notificationController.getNotifications,
);

// router.post(
//   '/notifications/create',
//   authentication.authenticate,
//   authentication.authenticateAdmin,
//   notificationController.createNotification,
// );

router.delete(
  '/notifications/:notificationId',
  authentication.authenticate,
  notificationController.deleteNotification,
);

router.delete(
  '/notifications',
  authentication.authenticate,
  notificationController.deleteNotifications,
);

export default router;
