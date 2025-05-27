import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import itemServices from '../services/itemServices.js';
const armorController = {
    getArmor: async (_req, res) => {
        try {
            const armors = await itemServices.getItems(['armor']);
            res.status(200).json(armors);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getArmorById: async (req, res) => {
        try {
            const armor = await itemServices.getItemById('armor', Number(req.params.armorId));
            res.status(200).json(armor);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrUpdateArmor: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody, 'armor');
                res.status(200).json({
                    message: req.body.armorId
                        ? 'Successfully updated armor'
                        : 'Successfully created armor',
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    ],
    modifyArmor: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody, 'armor');
                res.status(200).json({ message: 'Successfully modified armor' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    ],
    deleteArmor: async (req, res) => {
        try {
            await itemServices.deleteItem(Number(req.params.armorId));
            res.status(200).json({ message: 'Successfully deleted armor' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default armorController;
