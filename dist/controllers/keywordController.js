var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import keywordServices from '../services/keywordServices.js';
const keywordController = {
    getKeywords: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keywords = yield keywordServices.getKeywords();
            res.status(200).json(keywords);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    getKeywordById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keyword = yield keywordServices.getKeywordById(req.params.keywordId);
            res.status(200).json(keyword);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createKeyword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keyword = yield keywordServices.createKeyword(req.body);
            res.status(200).json(keyword);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    deleteKeyword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield keywordServices.deleteKeyword(req.params.keywordId);
            res.status(200).json({ message: 'Successfully deleted keyword' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default keywordController;
