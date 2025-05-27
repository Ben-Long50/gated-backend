import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import itemServices from '../services/itemServices.js';
const weaponController = {
    getWeapons: async (_req, res) => {
        try {
            const weapons = await itemServices.getItems(['weapon']);
            res.status(200).json(weapons);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getWeaponById: async (req, res) => {
        try {
            const weapon = await itemServices.getItemById('weapon', Number(req.params.weaponId));
            res.status(200).json(weapon);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrUpdateWeapon: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody, 'weapon');
                res.status(200).json({
                    message: req.body.weaponId
                        ? 'Successfully updated weapon'
                        : 'Successfully created weapon',
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    ],
    modifyWeapon: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody, 'weapon');
                res.status(200).json({ message: 'Successfully modified weapon' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    deleteWeapon: async (req, res) => {
        try {
            await itemServices.deleteItem(Number(req.params.weaponId));
            res.status(200).json({ message: 'Successfully deleted weapon' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default weaponController;
