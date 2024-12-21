var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import characterServices from '../services/characterServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const characterController = {
    getCharacters: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const characters = yield characterServices.getCharacters(req.user.id);
            res.status(200).json(characters);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getCharacterById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.params.characterId);
            const character = yield characterServices.getCharacterById(req.params.characterId);
            res.status(200).json(character);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    //   getCharacterById: async (req, res) => {
    //     try {
    //       const user = await userServices.getUserById(req.params.id);
    //       if (!user) {
    //         return res.status(404).json({ error: 'User not found' });
    //       }
    //       res.status(200).json(user);
    //     } catch (error) {
    //       res.status(500).json({ error: error.message });
    //     }
    //   },
    updateCharacter: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const character = yield characterServices.updateCharacter(req.body, req.user.id, req.params.characterId);
                res.status(200).json(character);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }),
    ],
    createCharacter: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const character = yield characterServices.createCharacter(req.body, req.user.id);
                res.status(200).json(character);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }),
    ],
};
export default characterController;
