import prisma from '../config/database.js';
const notificationServices = {
    getNotifications: async (userId) => {
        try {
            const notifications = await prisma.notification.findMany({
                where: { recipientId: userId },
                include: {
                    sender: {
                        select: { profilePicture: true, firstName: true, lastName: true },
                    },
                },
                orderBy: { createdAt: 'asc' },
            });
            return notifications;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch notifications');
        }
    },
    createNotification: async (type, recipients, sender) => {
        try {
            await prisma.notification.createMany({
                data: recipients.map((recipient) => ({
                    type,
                    recipientId: recipient,
                    senderId: sender,
                })),
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update notification');
        }
    },
    deleteNotification: async (notificationId) => {
        try {
            await prisma.notification.delete({
                where: {
                    id: Number(notificationId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete notification');
        }
    },
    deleteNotifications: async (userId) => {
        try {
            await prisma.notification.deleteMany({
                where: {
                    recipientId: userId,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete notifications');
        }
    },
};
export default notificationServices;
