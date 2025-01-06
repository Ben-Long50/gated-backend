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
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            const characters = yield characterServices.getCharacters(req.user.id);
            res.status(200).json(characters);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    getCharacterById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.params.characterId);
            const character = yield characterServices.getCharacterById(req.params.characterId);
            res.status(200).json(character);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createCharacter: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    throw new Error('Could not find authenticated user');
                }
                const character = yield characterServices.createCharacter(req.body, req.user.id);
                res.status(200).json(character);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        }),
    ],
    updateCharacter: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    throw new Error('Could not find authenticated user');
                }
                const character = yield characterServices.updateCharacter(req.body, req.user.id, req.params.characterId);
                res.status(200).json(character);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        }),
    ],
    deleteCharacter: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            yield characterServices.deleteCharacter(req.user.id, req.params.characterId);
            res.status(200).json({ message: 'Successfully deleted character' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default characterController;
