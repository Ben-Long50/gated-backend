import prisma from '../config/database.js';
const bookServices = {
    getBookSections: async () => {
        try {
            const book = await prisma.bookSection.findMany({
                include: { entries: { orderBy: { page: 'asc' } } },
                orderBy: { order: 'asc' },
            });
            return book;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch book');
        }
    },
    getBookEntry: async (bookEntryId) => {
        try {
            const bookEntry = await prisma.bookEntry.findUnique({
                where: { id: Number(bookEntryId) },
            });
            return bookEntry;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch book');
        }
    },
    createBookEntry: async (formData) => {
        try {
            const bookEntry = await prisma.bookEntry.upsert({
                where: { id: formData.bookEntryId || 0 },
                update: {
                    page: formData.page,
                    title: formData.title.toLowerCase(),
                    sectionId: Number(formData.section),
                    content: formData.content,
                },
                create: {
                    page: formData.page,
                    title: formData.title.toLowerCase(),
                    sectionId: Number(formData.section),
                    content: formData.content,
                },
            });
            return bookEntry;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update book entry');
        }
    },
    createBookSection: async (formData) => {
        try {
            const highestOrder = await prisma.bookSection.aggregate({
                _max: {
                    order: true,
                },
            });
            const greatest = highestOrder._max.order || 0;
            const bookSection = await prisma.bookSection.upsert({
                where: { id: formData.bookSectionId || 0 },
                update: {
                    title: formData.title.toLowerCase(),
                    order: formData === null || formData === void 0 ? void 0 : formData.order,
                },
                create: {
                    title: formData.title.toLowerCase(),
                    order: greatest + 1,
                },
            });
            return bookSection;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update book entry');
        }
    },
    deleteBookEntry: async (bookEntryId) => {
        try {
            await prisma.bookEntry.delete({
                where: {
                    id: Number(bookEntryId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete book entry');
        }
    },
    deleteBookSection: async (bookSectionId) => {
        try {
            await prisma.bookSection.delete({
                where: {
                    id: Number(bookSectionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete book section');
        }
    },
};
export default bookServices;
