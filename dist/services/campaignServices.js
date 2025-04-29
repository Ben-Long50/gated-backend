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
                include: {
                    players: { orderBy: { firstName: 'desc' } },
                    pendingPlayers: { orderBy: { firstName: 'desc' } },
                    owner: true,
                },
                orderBy: { name: 'asc' },
            });
            return campaigns;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch player campaigns');
        }
    },
    getPendingCampaigns: async (userId) => {
        try {
            const campaigns = await prisma.campaign.findMany({
                where: { pendingPlayers: { some: { id: userId } } },
                include: {
                    players: { orderBy: { firstName: 'desc' } },
                    pendingPlayers: { orderBy: { firstName: 'desc' } },
                    owner: true,
                },
                orderBy: { name: 'asc' },
            });
            return campaigns;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch pending campaigns');
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
                    factions: { include: { affiliations: true } },
                    characters: {
                        select: { id: true },
                    },
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
    createOrUpdateCampaign: async (formData, ownerId) => {
        if (formData.id) {
            const campaign = await prisma.campaign.findUnique({
                where: { id: formData.id },
                select: { ownerId: true },
            });
            if ((campaign === null || campaign === void 0 ? void 0 : campaign.ownerId) !== ownerId) {
                throw new Error('Only the owner of the campaign can update it');
            }
        }
        try {
            const campaign = await prisma.campaign.upsert({
                where: { id: (formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    location: formData.location,
                    picture: formData.picture,
                    ownerId,
                    pendingPlayers: {
                        connect: formData.players.map((user) => ({ id: user.id })),
                    },
                },
                create: {
                    name: formData.name,
                    location: formData.location,
                    picture: formData.picture,
                    ownerId,
                    pendingPlayers: {
                        connect: formData.players.map((user) => ({ id: user.id })),
                    },
                },
            });
            if (!formData.id) {
                const createdFactions = await Promise.all(formData.factions.map((faction) => prisma.faction.create({
                    data: Object.assign(Object.assign({}, faction), { campaignId: campaign.id }),
                })));
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
            return campaign;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update campaign');
        }
    },
    joinCampaign: async (campaignId, userId) => {
        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: Number(campaignId) },
                select: {
                    pendingPlayers: { select: { id: true } },
                },
            });
            const inPending = campaign
                ? campaign.pendingPlayers.some((player) => player.id === userId)
                : [];
            if (!inPending) {
                throw new Error('You cannot join a campaign if you are not a pending player');
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
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to join campaign');
        }
    },
    deleteCampaign: async (campaignId, userId) => {
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
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to delete campaign');
        }
    },
};
export default campaignServices;
