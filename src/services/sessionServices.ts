import prisma from '../config/database.js';

const sessionServices = {
  getCampaignSessions: async (campaignId: string) => {
    try {
      const sessions = await prisma.session.findMany({
        where: { campaignId: Number(campaignId) },
        orderBy: { sessionNumber: 'asc' },
      });
      return sessions;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch campaign sessions');
    }
  },

  getSessionById: async (campaignId: number, sessionId: number) => {
    try {
      const session = await prisma.session.findUnique({
        where: { id: sessionId, campaignId: campaignId },
        include: { characters: true },
      });

      return session;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch session');
    }
  },

  createOrUpdateSessionNotes: async (
    sessionId: number,
    characterId: number,
    content: { html: string; nodes: object },
  ) => {
    try {
      const notes = await prisma.note.upsert({
        where: { sessionId_characterId: { sessionId, characterId } },
        update: {
          content,
        },
        create: {
          sessionId,
          characterId,
          content,
        },
      });

      return notes;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update notes');
    }
  },

  getSessionNotes: async (sessionId: number, characterId: number) => {
    try {
      const notes = await prisma.note.findUnique({
        where: { sessionId_characterId: { sessionId, characterId } },
        include: { character: { select: { userId: true } } },
      });

      return notes;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch notes');
    }
  },

  createOrUpdateSession: async (
    formData: {
      id?: number;
      name: string;
      location?: string;
      briefing: { html: string; nodes: object };
      picture?: { imageUrl: string; nodes: object };
      characters?: number[];
    },
    campaignId: number,
  ) => {
    try {
      const previousSession = await prisma.session.findFirst({
        where: { campaignId },
        orderBy: {
          sessionNumber: 'desc',
        },
        select: { sessionNumber: true },
      });

      const sessionNumber = previousSession
        ? previousSession?.sessionNumber + 1
        : 0;

      const characterIds = formData.characters
        ? formData.characters.map((id) => ({ id }))
        : [];

      const session = await prisma.session.upsert({
        where: { id: formData?.id || 0 },
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
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update session');
    }
  },

  deleteSession: async (sessionId: string) => {
    try {
      await prisma.session.delete({
        where: {
          id: Number(sessionId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete session');
    }
  },
};

export default sessionServices;
