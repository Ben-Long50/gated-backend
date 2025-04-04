import prisma from '../config/database.js';
const sessionServices = {
    getCampaignSessions: async (campaignId) => {
        try {
            const sessions = await prisma.session.findMany({
                where: { campaignId: Number(campaignId) },
                orderBy: { sessionNumber: 'asc' },
            });
            return sessions;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch campaign sessions');
        }
    },
    getSessionById: async (sessionId) => {
        try {
            const session = await prisma.session.findUnique({
                where: { id: Number(sessionId) },
            });
            return session;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch session');
        }
    },
    createOrUpdateSession: async (formData) => {
        try {
            const session = await prisma.session.upsert({
                where: { id: Number(formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    briefing: formData.briefing,
                    sessionNumber: formData.sessionNumber,
                },
                create: {
                    name: formData.name,
                    sessionNumber: formData.sessionNumber,
                    briefing: formData.briefing,
                    campaignId: formData.campaignId,
                },
            });
            return session;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update session');
        }
    },
    deleteSession: async (sessionId) => {
        try {
            await prisma.session.delete({
                where: {
                    id: Number(sessionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete session');
        }
    },
};
export default sessionServices;
