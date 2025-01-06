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
const bookServices = {
    getBook: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield prisma.bookEntry.findMany({
                select: { id: true, title: true },
                orderBy: { id: 'asc' },
            });
            return book;
        }
        catch (error) {
            throw new Error('Failed to fetch book');
        }
    }),
    getBookEntryByTitle: (bookEntryTitle) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(bookEntryTitle);
            const bookEntry = yield prisma.bookEntry.findUnique({
                where: { title: bookEntryTitle },
            });
            return bookEntry;
        }
        catch (error) {
            throw new Error('Failed to fetch book');
        }
    }),
    createBookEntry: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookEntry = yield prisma.bookEntry.upsert({
                where: { id: formData.bookEntryId || 0 },
                update: {
                    title: formData.title.toLowerCase(),
                    content: formData.content,
                },
                create: {
                    title: formData.title.toLowerCase(),
                    content: formData.content,
                },
            });
            return bookEntry;
        }
        catch (error) {
            throw new Error('Failed to create or update book entry');
        }
    }),
    deleteBookEntry: (bookEntryId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.bookEntry.delete({
                where: {
                    id: Number(bookEntryId),
                },
            });
        }
        catch (error) {
            throw new Error(error.message || 'Failed to delete book entry');
        }
    }),
};
export default bookServices;
