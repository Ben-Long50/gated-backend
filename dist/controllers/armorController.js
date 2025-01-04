var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import armorServices from '../services/armorServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const armorController = {
    getArmor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const armors = yield armorServices.getArmor();
            res.status(200).json(armors);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getArmorById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const armor = yield armorServices.getArmorById(req.params.armorId);
            res.status(200).json(armor);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    createArmor: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const armor = yield armorServices.createArmor(req.body);
                res.status(200).json(armor);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }),
    ],
    deleteArmor: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield armorServices.deleteArmor(req.params.armorId);
            res.status(200).json({ message: 'Successfully deleted armor' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
export default armorController;
