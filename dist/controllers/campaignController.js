import campaignServices from '../services/campaignServices.js';
import sessionServices from '../services/sessionServices.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import notificationServices from '../services/notificationServices.js';
import parseRequestBody from '../utils/parseRequestBody.js';
const campaignController = {
    getOwnerCampaigns: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            const campaigns = await campaignServices.getOwnerCampaigns(req.user.id);
            res.status(200).json(campaigns);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPlayerCampaigns: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            const campaigns = await campaignServices.getPlayerCampaigns(req.user.id);
            res.status(200).json(campaigns);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getPendingCampaigns: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            const campaigns = await campaignServices.getPendingCampaigns(req.user.id);
            res.status(200).json(campaigns);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getCampaignById: async (req, res) => {
        try {
            const campaign = await campaignServices.getCampaignById(req.params.campaignId);
            res.status(200).json(campaign);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createCampaign: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        error: 'You do not have the required permissions to create a campaign',
                    });
                    return;
                }
                const parsedBody = parseRequestBody(req.body);
                const campaign = await campaignServices.createOrUpdateCampaign(parsedBody, req.user.id);
                const sessionInfo = {
                    name: 'Introduction',
                    sessionNumber: 0,
                    briefing: parsedBody.briefing,
                };
                if (!parsedBody.id) {
                    await sessionServices.createOrUpdateSession(sessionInfo, campaign.id);
                }
                await notificationServices.createNotification('campaignInvite', parsedBody.players.map((player) => player.id), req.user.id);
                res
                    .status(200)
                    .json({ message: 'Successfully created campaign and session 0' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    joinCampaign: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            await campaignServices.joinCampaign(req.params.campaignId, req.user.id);
            res.status(200).json({ message: 'Successfully joined the campaign' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteCampaign: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            await campaignServices.deleteCampaign(Number(req.params.campaignId), req.user.id);
            res.status(200).json({ message: 'Successfully deleted campaign' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default campaignController;
