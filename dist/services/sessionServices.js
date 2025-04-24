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
    getSessionById: async (campaignId, sessionId) => {
        try {
            const session = await prisma.session.findUnique({
                where: { id: sessionId, campaignId: campaignId },
                include: { characters: true },
            });
            return session;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch session');
        }
    },
    createOrUpdateSession: async (formData, campaignId) => {
        try {
            const previousSession = await prisma.session.findFirst({
                where: { campaignId },
                orderBy: {
                    sessionNumber: 'desc',
                },
                select: { sessionNumber: true },
            });
            const sessionNumber = previousSession
                ? (previousSession === null || previousSession === void 0 ? void 0 : previousSession.sessionNumber) + 1
                : 0;
            const characterIds = formData.characters
                ? formData.characters.map((id) => ({ id }))
                : [];
            console.log(formData);
            const session = await prisma.session.upsert({
                where: { id: (formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    briefing: formData.briefing,
                    characters: { set: characterIds },
                    picture: formData.picture,
                },
                create: {
                    name: formData.name,
                    sessionNumber,
                    briefing: formData.briefing,
                    campaignId,
                    characters: { connect: characterIds },
                    picture: formData.picture,
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
