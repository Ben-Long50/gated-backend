import factionServices from '../services/factionServices.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import campaignServices from '../services/campaignServices.js';
import parseRequestBody from '../utils/parseRequestBody.js';
const factionController = {
    getCampaignFactions: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            const factions = await factionServices.getCampaignFactions(req.params.campaignId);
            res.status(200).json(factions);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getFactionById: async (req, res) => {
        try {
            const faction = await factionServices.getFactionById(req.params.factionId);
            res.status(200).json(faction);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    updateFaction: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                if (!req.user) {
                    res.status(401).json({
                        error: 'You do not have the required permissions to update a faction',
                    });
                    return;
                }
                const campaign = await campaignServices.getCampaignById(req.params.campaignId);
                if (req.user.id !== (campaign === null || campaign === void 0 ? void 0 : campaign.ownerId)) {
                    res.status(401).json({
                        error: 'You can only update faction information if you are the game master of this campaign',
                    });
                    return;
                }
                req.body.id = req.params.factionId;
                const parsedBody = parseRequestBody(req.body);
                await factionServices.updateFaction(parsedBody);
                res.status(200).json({ message: 'Successfully created faction' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    deleteFaction: async (req, res) => {
        try {
            if (!req.user) {
                res.status(401).json({
                    error: 'You do not have the required permissions to update a faction',
                });
                return;
            }
            const campaign = await campaignServices.getCampaignById(req.params.campaignId);
            if (req.user.id !== (campaign === null || campaign === void 0 ? void 0 : campaign.ownerId)) {
                res.status(401).json({
                    error: 'You can only delete this faction if you are the game master of this campaign',
                });
                return;
            }
            await factionServices.deleteFaction(req.params.factionId);
            res.status(200).json({ message: 'Successfully deleted faction' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default factionController;
