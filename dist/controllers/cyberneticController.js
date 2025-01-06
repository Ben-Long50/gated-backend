var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cyberneticServices from '../services/cyberneticServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const cyberneticController = {
    getCybernetics: (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cybernetics = yield cyberneticServices.getCybernetics();
            res.status(200).json(cybernetics);
        }
        catch (error) {
             if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
        }
    }),
    getCyberneticById: (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cybernetic = yield cyberneticServices.getCyberneticById(req.params.cyberneticId);
            res.status(200).json(cybernetic);
        }
        catch (error) {
             if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
        }
    }),
    createCybernetic: [
        upload.single('picture'),
        uploadToCloudinary,
        (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cybernetic = yield cyberneticServices.createCybernetic(req.body);
                res.status(200).json(cybernetic);
            }
            catch (error) {
                 if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
            }
        }),
    ],
    updateCybernetic: [
        upload.single('picture'),
        uploadToCloudinary,
        (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cybernetic = yield cyberneticServices.updateCybernetic(req.body, req.params.cyberneticId);
                res.status(200).json(cybernetic);
            }
            catch (error) {
                 if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
            }
        }),
    ],
    deleteCybernetic: (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cyberneticServices.deleteCybernetic(req.params.cyberneticId);
            res.status(200).json({ message: 'Successfully deleted cybernetic' });
        }
        catch (error) {
             if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
        }
    }),
};
export default cyberneticController;
