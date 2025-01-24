import weaponServices from '../services/weaponServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const weaponController = {
    getWeapons: async (_req, res) => {
        try {
            const weapons = await weaponServices.getWeapons();
            res.status(200).json(weapons);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getWeaponsByKeyword: async (req, res) => {
        try {
            const weaponsByKeyword = await weaponServices.getWeaponsByKeyword(req.body.keywordNames);
            res.status(200).json(weaponsByKeyword);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getWeaponById: async (req, res) => {
        try {
            const weapon = await weaponServices.getWeaponById(req.params.weaponId);
            res.status(200).json(weapon);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    createWeapon: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const weapon = await weaponServices.createWeapon(req.body);
                res.status(200).json(weapon);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    deleteWeaponByName: async (req, res) => {
        try {
            await weaponServices.deleteWeaponByName(req.params.weaponName);
            res.status(200).json({ message: 'Successfully deleted weapon' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    deleteWeapon: async (req, res) => {
        try {
            await weaponServices.deleteWeapon(req.params.weaponId);
            res.status(200).json({ message: 'Successfully deleted weapon' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default weaponController;
