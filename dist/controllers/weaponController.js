var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import weaponServices from '../services/weaponServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const weaponController = {
    getWeapons: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const weapons = yield weaponServices.getWeapons();
            res.status(200).json(weapons);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    getWeaponById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const weapon = yield weaponServices.getWeaponById(req.params.weaponId);
            res.status(200).json(weapon);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createWeapon: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const weapon = yield weaponServices.createWeapon(req.body);
                res.status(200).json(weapon);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        }),
    ],
    deleteWeaponByName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield weaponServices.deleteWeaponByName(req.params.weaponName);
            res.status(200).json({ message: 'Successfully deleted weapon' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    deleteWeapon: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield weaponServices.deleteWeapon(req.params.weaponId);
            res.status(200).json({ message: 'Successfully deleted weapon' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default weaponController;
