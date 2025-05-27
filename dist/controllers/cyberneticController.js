import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import itemServices from '../services/itemServices.js';
const cyberneticController = {
    getCybernetics: async (_req, res) => {
        try {
            const augmentations = await itemServices.getItems(['augmentation']);
            res.status(200).json(augmentations);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getCyberneticById: async (req, res) => {
        try {
            const augmentation = await itemServices.getItemById('augmentation', Number(req.params.cyberneticId));
            res.status(200).json(augmentation);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrUpdateCybernetic: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody, 'augmentation');
                res.status(200).json({
                    message: req.body.cyberneticId
                        ? 'Successfully updated augmentation'
                        : 'Successfully created augmentation',
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    ],
    modifyCybernetic: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody, 'augmentation');
                res.status(200).json({ message: 'Successfully modified augmentation' });
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
            await itemServices.deleteItem(Number(req.params.cyberneticId));
            res.status(200).json({ message: 'Successfully deleted augmentation' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default cyberneticController;
