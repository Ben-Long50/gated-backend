import sessionServices from '../services/sessionServices.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
const sessionController = {
    getCampaignSessions: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            const sessions = await sessionServices.getCampaignSessions(req.params.campaignId);
            res.status(200).json(sessions);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getSessionById: async (req, res) => {
        try {
            const session = await sessionServices.getSessionById(Number(req.params.campaignId), Number(req.params.sessionId));
            res.status(200).json(session);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrUpdateSessionNotes: async (req, res) => {
        try {
            await sessionServices.createOrUpdateSessionNotes(Number(req.params.sessionId), Number(req.params.characterId), req.body.content);
            res
                .status(200)
                .json({ message: 'Successfully created or updated session notes' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrUpdateSession: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await sessionServices.createOrUpdateSession(parsedBody, Number(req.params.campaignId));
                res.status(200).json({ message: 'Successfully created session' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    deleteSession: async (req, res) => {
        try {
            await sessionServices.deleteSession(req.params.campaignId);
            res.status(200).json({ message: 'Successfully deleted session' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default sessionController;
