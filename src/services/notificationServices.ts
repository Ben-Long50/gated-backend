import { $Enums } from '@prisma/client';
import prisma from '../config/database.js';

const notificationServices = {
  getNotifications: async (userId: number) => {
    try {
      const notifications = await prisma.notification.findMany({
        where: { recipientId: userId },
        include: {
          sender: {
            select: { profilePicture: true, username: true },
          },
        },
        orderBy: { createdAt: 'asc' },
      });

      return notifications;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch notifications');
    }
  },

  createNotification: async (
    type: $Enums.NotificationType,
    recipients: number[],
    sender: number,
  ) => {
    try {
      await prisma.notification.createMany({
        data: recipients.map((recipient) => ({
          type,
          recipientId: recipient,
          senderId: sender,
        })),
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update notification');
    }
  },

  markNotificationsRead: async (userId: number) => {
    try {
      await prisma.notification.updateMany({
        where: { recipientId: userId },
        data: { read: true },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update notification');
    }
  },

  deleteNotification: async (notificationId: number) => {
    try {
      await prisma.notification.delete({
        where: {
          id: notificationId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete notification');
    }
  },

  deleteNotifications: async (userId: number) => {
    try {
      await prisma.notification.deleteMany({
        where: {
          recipientId: userId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete notifications');
    }
  },
};

export default notificationServices;
