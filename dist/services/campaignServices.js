import prisma from '../config/database.js';
const campaignServices = {
    getOwnerCampaigns: async (userId) => {
        try {
            const campaigns = await prisma.campaign.findMany({
                where: { ownerId: userId },
                include: {
                    players: { orderBy: { firstName: 'desc' } },
                    pendingPlayers: { orderBy: { firstName: 'desc' } },
                    owner: true,
                },
                orderBy: { name: 'asc' },
            });
            console.log(campaigns);
            return campaigns;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch owner campaigns');
        }
    },
    getPlayerCampaigns: async (userId) => {
        try {
            const campaigns = await prisma.campaign.findMany({
                where: { players: { some: { id: userId } } },
                orderBy: { name: 'asc' },
            });
            return campaigns;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch player campaigns');
        }
    },
    getCampaignById: async (campaignId) => {
        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: Number(campaignId) },
                include: {
                    sessions: true,
                    players: { orderBy: { firstName: 'desc' } },
                    pendingPlayers: { orderBy: { firstName: 'desc' } },
                    owner: true,
                },
            });
            return campaign;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch campaign');
        }
    },
    createOrUpdateCampaign: async (formData) => {
        try {
            const campaign = await prisma.campaign.upsert({
                where: { id: Number(formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    location: formData.location,
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    ownerId: formData.ownerId,
                    factions: formData.factions,
                    pendingPlayers: {
                        connect: formData.players.map((user) => ({ id: user.id })),
                    },
                },
                create: {
                    name: formData.name,
                    location: formData.location,
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    ownerId: formData.ownerId,
                    factions: formData.factions,
                    pendingPlayers: {
                        connect: formData.players.map((user) => ({ id: user.id })),
                    },
                },
            });
            return campaign;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update campaign');
        }
    },
    deleteCampaign: async (campaignId) => {
        try {
            await prisma.campaign.delete({
                where: {
                    id: Number(campaignId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete campaign');
        }
    },
};
export default campaignServices;
