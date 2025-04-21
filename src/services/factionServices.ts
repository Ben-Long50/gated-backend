import { Affiliation } from '@prisma/client';
import prisma from '../config/database.js';

const factionServices = {
  getCampaignFactions: async (campaignId: string) => {
    try {
      const factions = await prisma.faction.findMany({
        where: { campaignId: Number(campaignId) },
        orderBy: { name: 'asc' },
      });

      return factions;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch owner factions');
    }
  },

  getFactionById: async (factionId: string) => {
    try {
      const faction = await prisma.faction.findUnique({
        where: { id: Number(factionId) },
        include: {
          affiliations: { include: { factions: true, characters: true } },
        },
      });
      return faction;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch faction');
    }
  },

  updateFaction: async (formData: {
    id: number;
    name: string;
    background: { html: string; nodes: string };
    publicId: string;
    imageUrl: string;
    affiliations: Affiliation[];
  }) => {
    try {
      const faction = await prisma.faction.update({
        where: { id: formData.id },
        data: {
          name: formData.name,
          background: formData.background,
          picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
        },
      });

      const affiliationUpdates = formData.affiliations.map((affiliation) => ({
        id: affiliation.id,
        value: affiliation.value,
      }));

      await Promise.all(
        affiliationUpdates.map(({ id, value }) =>
          prisma.affiliation.update({
            where: { id },
            data: { value },
          }),
        ),
      );

      return faction;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update faction');
    }
  },

  deleteFaction: async (factionId: string) => {
    try {
      await prisma.faction.delete({
        where: {
          id: Number(factionId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete faction');
    }
  },
};

export default factionServices;
