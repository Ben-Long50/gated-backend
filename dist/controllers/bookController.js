var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bookServices from '../services/bookServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const bookController = {
    getBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield bookServices.getBook();
            res.status(200).json(book);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getBookEntryByTitle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookEntry = yield bookServices.getBookEntryByTitle(req.params.bookEntryTitle.toLowerCase());
            res.status(200).json(bookEntry);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    createBookEntry: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookEntry = yield bookServices.createBookEntry(req.body);
            res.status(200).json(bookEntry);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    deleteBookEntry: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield bookServices.deleteBookEntry(req.params.bookEntryId);
            res.status(200).json({ message: 'Book entry successfully deleted' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    uploadBookImage: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                res.status(200).json(req.body.imageUrl);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        }),
    ],
};
export default bookController;
