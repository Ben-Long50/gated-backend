import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import modificationServices from '../services/modificationServices.js';
import { destructureLinkReference } from '../utils/destructureItemLinks.js';
const modificationController = {
    getModifications: async (_req, res) => {
        try {
            const modifications = await modificationServices.getModifications();
            const modificationData = modifications.map((modification) => destructureLinkReference(modification));
            res.status(200).json(modificationData);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getModificationById: async (req, res) => {
        try {
            const modification = await modificationServices.getModificationById(req.params.modId);
            if (!modification) {
                throw new Error('Modification not found');
            }
            const modificationData = destructureLinkReference(modification);
            res.status(200).json(modificationData);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrUpdateModification: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await modificationServices.createOrUpdateModification(parsedBody);
                res.status(200).json({
                    message: parsedBody.id
                        ? 'Successfully updated modification'
                        : 'Successfully created modification',
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    ],
    deleteModification: async (req, res) => {
        try {
            await modificationServices.deleteModification(req.params.modId);
            res
                .status(200)
                .json({ message: 'Successfully deleted vehicle modification' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default modificationController;
