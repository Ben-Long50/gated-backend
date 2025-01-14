var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import patchNoteServices from '../services/patchNoteServices.js';
const patchNoteController = {
    getPatchNotes: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchNotes = yield patchNoteServices.getPatchNotes();
            res.status(200).json(patchNotes);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    getPatchNoteById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchNote = yield patchNoteServices.getPatchNoteById(req.params.patchNoteId);
            res.status(200).json(patchNote);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createPatchNote: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchNote = yield patchNoteServices.createPatchNote(req.body);
            res.status(200).json(patchNote);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    deletePatchNote: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield patchNoteServices.deletePatchNote(req.params.patchNoteId);
            res.status(200).json({ message: 'Patch note successfully deleted' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default patchNoteController;
