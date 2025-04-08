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
                    factions: { include: { primaryAffiliations: true } },
                    characters: {
                        include: {
                            perks: {
                                include: { modifiers: { include: { action: true } } },
                            },
                            characterInventory: {
                                include: {
                                    weapons: {
                                        where: { equipped: true },
                                        include: { actions: true },
                                        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                                    },
                                    armor: {
                                        where: { equipped: true },
                                        include: { actions: true },
                                        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                                    },
                                    cybernetics: {
                                        where: { equipped: true },
                                        include: {
                                            weapons: true,
                                            armor: true,
                                            actions: true,
                                            modifiers: { include: { action: true } },
                                        },
                                        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                                    },
                                    vehicles: {
                                        include: { weapons: true, modifications: true },
                                        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                                    },
                                    items: {
                                        where: { equipped: true },
                                        include: {
                                            actions: true,
                                            modifiers: { include: { action: true } },
                                        },
                                        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
                                    },
                                },
                            },
                        },
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
    createOrUpdateCampaign: async (formData) => {
        try {
            const campaign = await prisma.campaign.upsert({
                where: { id: Number(formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    location: formData.location,
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    ownerId: formData.ownerId,
                    pendingPlayers: {
                        connect: formData.players.map((user) => ({ id: user.id })),
                    },
                },
                create: {
                    name: formData.name,
                    location: formData.location,
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    ownerId: formData.ownerId,
                    pendingPlayers: {
                        connect: formData.players.map((user) => ({ id: user.id })),
                    },
                },
            });
            const createdFactions = await Promise.all(formData.factions.map((faction) => prisma.faction.create({
                data: Object.assign(Object.assign({}, faction), { campaignId: campaign.id }),
            })));
            if (createdFactions.length >= 2) {
                const [faction1, faction2] = createdFactions;
                await prisma.affiliation.createMany({
                    data: [
                        {
                            primaryFactionId: faction1.id,
                            secondaryFactionId: faction2.id,
                            value: formData.affiliation,
                        },
                        {
                            primaryFactionId: faction2.id,
                            secondaryFactionId: faction1.id,
                            value: formData.affiliation,
                        },
                    ],
                });
            }
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
