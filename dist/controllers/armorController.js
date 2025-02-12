import armorServices from '../services/armorServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const armorController = {
    getArmor: async (_req, res) => {
        try {
            const armors = await armorServices.getArmor();
            res.status(200).json(armors);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getArmorById: async (req, res) => {
        try {
            const armor = await armorServices.getArmorById(req.params.armorId);
            res.status(200).json(armor);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    createOrUpdateArmor: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                await armorServices.createOrUpdateArmor(req.body);
                res.status(200).json({
                    message: req.body.armorId
                        ? 'Successfully updated armor'
                        : 'Successfully created armor',
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    modifyArmor: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                await armorServices.createOrUpdateArmor(req.body);
                res.status(200).json({ message: 'Successfully modified armor' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    deleteArmor: async (req, res) => {
        try {
            await armorServices.deleteArmor(req.params.armorId);
            res.status(200).json({ message: 'Successfully deleted armor' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default armorController;
