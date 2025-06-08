import prisma from '../config/database.js';
const factionServices = {
    getCampaignFactions: async (campaignId) => {
        try {
            const factions = await prisma.faction.findMany({
                where: { campaignId: Number(campaignId) },
                orderBy: { name: 'asc' },
            });
            return factions;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch owner factions');
        }
    },
    getFactionById: async (factionId) => {
        try {
            const faction = await prisma.faction.findUnique({
                where: { id: Number(factionId) },
                include: {
                    affiliations: { select: { id: true } },
                },
            });
            return faction;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch faction');
        }
    },
    updateFaction: async (formData) => {
        try {
            const faction = await prisma.faction.update({
                where: { id: formData.id },
                data: {
                    name: formData.name,
                    background: formData.background,
                    picture: formData.picture,
                },
            });
            return faction;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update faction');
        }
    },
    deleteFaction: async (factionId) => {
        try {
            const faction = await prisma.faction.findUnique({
                where: {
                    id: Number(factionId),
                },
                select: {
                    affiliations: { select: { id: true } },
                },
            });
            if (!faction) {
                throw new Error('Failed to find faction');
            }
            await prisma.affiliation.deleteMany({
                where: {
                    id: { in: faction.affiliations.map((affiliation) => affiliation.id) },
                },
            });
            await prisma.faction.delete({
                where: {
                    id: Number(factionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete faction');
        }
    },
};
export default factionServices;
