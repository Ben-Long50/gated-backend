import cyberneticServices from '../services/cyberneticServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const cyberneticController = {
    getCybernetics: async (_req, res) => {
        try {
            const cybernetics = await cyberneticServices.getCybernetics();
            res.status(200).json(cybernetics);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getCyberneticById: async (req, res) => {
        try {
            const cybernetic = await cyberneticServices.getCyberneticById(req.params.cyberneticId);
            res.status(200).json(cybernetic);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    createOrUpdateCybernetic: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                await cyberneticServices.createOrUpdateCybernetic(req.body);
                res.status(200).json({
                    message: req.body.cyberneticId
                        ? 'Successfully updated cybernetic'
                        : 'Successfully created cybernetic',
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    modifyCybernetic: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                await cyberneticServices.createOrUpdateCybernetic(req.body);
                res.status(200).json({ message: 'Successfully modified cybernetic' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    deleteCybernetic: async (req, res) => {
        try {
            await cyberneticServices.deleteCybernetic(req.params.cyberneticId);
            res.status(200).json({ message: 'Successfully deleted cybernetic' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default cyberneticController;
