import prisma from '../config/database.js';
const patchNoteServices = {
    getPatchNotes: async () => {
        try {
            const patchNotes = await prisma.patchNote.findMany({
                orderBy: { createdAt: 'desc' },
            });
            return patchNotes;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch patch notes');
        }
    },
    getPatchNoteById: async (patchNoteId) => {
        try {
            const patchNote = await prisma.patchNote.findUnique({
                where: { id: Number(patchNoteId) },
            });
            return patchNote;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch patch note');
        }
    },
    createPatchNote: async (formData) => {
        try {
            const patchNote = await prisma.patchNote.upsert({
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
    },
    deletePatchNote: async (bookEntryId) => {
        try {
            await prisma.patchNote.delete({
                where: {
                    id: Number(bookEntryId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete patch note');
        }
    },
};
export default patchNoteServices;
