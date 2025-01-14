var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../config/database.js';
const patchNoteServices = {
    getPatchNotes: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchNotes = yield prisma.patchNote.findMany({
                orderBy: { createdAt: 'desc' },
            });
            return patchNotes;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch patch notes');
        }
    }),
    getPatchNoteById: (patchNoteId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchNote = yield prisma.patchNote.findUnique({
                where: { id: Number(patchNoteId) },
            });
            return patchNote;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch patch note');
        }
    }),
    createPatchNote: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patchNote = yield prisma.patchNote.upsert({
                where: { id: formData.patchNoteId || 0 },
                update: {
                    version: formData.version,
                    title: formData.title.toLowerCase(),
                    content: formData.content,
                },
                create: {
                    version: formData.version,
                    title: formData.title.toLowerCase(),
                    content: formData.content,
                },
            });
            return patchNote;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update patch note');
        }
    }),
    deletePatchNote: (bookEntryId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.patchNote.delete({
                where: {
                    id: Number(bookEntryId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete patch note');
        }
    }),
};
export default patchNoteServices;
