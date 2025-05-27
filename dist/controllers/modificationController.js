import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import itemServices from '../services/itemServices.js';
const modificationController = {
    getModifications: async (_req, res) => {
        try {
            const modifications = await itemServices.getItems(['modification']);
            res.status(200).json(modifications);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getModificationById: async (req, res) => {
        try {
            const modification = await itemServices.getItemById('modification', Number(req.params.modId));
            if (!modification) {
                throw new Error('Modification not found');
            }
            res.status(200).json(modification);
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
                await itemServices.createOrUpdateItem(parsedBody, 'modification');
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
            await itemServices.deleteItem(Number(req.params.modId));
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
