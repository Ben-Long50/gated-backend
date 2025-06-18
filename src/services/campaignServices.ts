import { $Enums, User } from '@prisma/client';
import prisma from '../config/database.js';

const campaignServices = {
  getCampaigns: async (userId: number) => {
    try {
      const campaigns = await prisma.campaign.findMany({
        where: {
          OR: [
            { ownerId: userId },
            { players: { some: { id: userId } } },
            { pendingPlayers: { some: { id: userId } } },
          ],
        },
        include: {
          players: { orderBy: { firstName: 'desc' } },
          pendingPlayers: { orderBy: { firstName: 'desc' } },
          owner: true,
        },
        orderBy: { name: 'asc' },
      });

      return campaigns;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch owner campaigns');
    }
  },

  getCampaignById: async (campaignId: string) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: Number(campaignId) },
        include: {
          sessions: true,
          players: { orderBy: { firstName: 'desc' } },
          pendingPlayers: { orderBy: { firstName: 'desc' } },
          factions: { select: { id: true, name: true } },
          characters: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              picture: true,
            },
          },
          affiliations: { select: { id: true } },
          owner: true,
        },
      });
      return campaign;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch campaign');
    }
  },

  createOrUpdateCampaign: async (
    formData: {
      id?: number;
      name: string;
      location: string;
      picture: { imageUrl: string; publicId: string };
      ownerId: number;
      affiliation: number;
      factions: { factionType: $Enums.FactionType; name: string }[];
      players: User[];
      pendingPlayers: User[];
    },
    ownerId: number,
  ) => {
    let currentPending = [] as User[];

    if (formData.id) {
      const campaign = await prisma.campaign.findUnique({
        where: { id: formData.id },
        select: { ownerId: true, players: true, pendingPlayers: true },
      });

      if (campaign?.ownerId !== ownerId) {
        throw new Error('Only the owner of the campaign can update it');
      }

      currentPending = campaign.pendingPlayers || [];
    }

    const newPending = formData.pendingPlayers.filter(
      (player) => !currentPending.some((user) => user.id === player.id),
    );

    try {
      const campaign = await prisma.campaign.upsert({
        where: { id: formData?.id || 0 },
        update: {
          name: formData.name,
          location: formData.location,
          picture: formData.picture,
          ownerId,
          players: {
            set: formData.players.map((user) => ({ id: user.id })),
          },
          pendingPlayers: {
            set: formData.pendingPlayers.map((user) => ({ id: user.id })),
          },
        },
        create: {
          name: formData.name,
          location: formData.location,
          picture: formData.picture,
          ownerId,
          pendingPlayers: {
            connect: formData.pendingPlayers.map((user) => ({ id: user.id })),
          },
        },
      });

      if (!formData.id) {
        const createdFactions = await Promise.all(
          formData.factions.map((faction) =>
            prisma.faction.create({
              data: {
                ...faction,
                campaignId: campaign.id,
              },
            }),
          ),
        );

        if (createdFactions.length >= 2) {
          const [faction1, faction2] = createdFactions;

          await prisma.affiliation.create({
            data: {
              campaignId: campaign.id,
              factions: { connect: [{ id: faction1.id }, { id: faction2.id }] },
              value: formData.affiliation,
            },
          });
        }
      }

      return { campaign, newPending };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update campaign');
    }
  },

  getCharacterNotes: async (characterId: number) => {
    try {
      const notes = await prisma.note.findMany({
        where: { characterId },
        include: {
          character: {
            select: {
              userId: true,
              firstName: true,
              lastName: true,
              picture: true,
            },
          },
          session: {
            select: { sessionNumber: true, createdAt: true, name: true },
          },
        },
        orderBy: { session: { sessionNumber: 'asc' } },
      });

      return notes;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch notes');
    }
  },

  joinCampaign: async (campaignId: string, userId: number) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: Number(campaignId) },
        select: {
          pendingPlayers: { select: { id: true } },
        },
      });

      const inPending = campaign
        ? campaign.pendingPlayers.some(
            (player: { id: number }) => player.id === userId,
          )
        : [];

      if (!inPending) {
        throw new Error(
          'You cannot join a campaign if you are not a pending player',
        );
      }

      await prisma.campaign.update({
        where: {
          id: Number(campaignId),
        },
        data: {
          pendingPlayers: { disconnect: { id: userId } },
          players: { connect: { id: userId } },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to join campaign');
    }
  },

  deleteCampaign: async (campaignId: number, userId: number) => {
    try {
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        select: { ownerId: true },
      });

      if (!campaign) {
        throw new Error('Failed to find campaign');
      }

      if (campaign.ownerId !== userId) {
        throw new Error('Only the owner of the campaign can delete it');
      }

      await prisma.campaign.delete({
        where: {
          id: Number(campaignId),
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to delete campaign');
    }
  },
};

export default campaignServices;
