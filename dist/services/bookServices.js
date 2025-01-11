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
    getBookSections: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const book = yield prisma.bookSection.findMany({
                include: { entries: { orderBy: { page: 'asc' } } },
                orderBy: { order: 'asc' },
            });
            return book;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch book');
        }
    }),
    getBookEntry: (bookEntryId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookEntry = yield prisma.bookEntry.findUnique({
                where: { id: Number(bookEntryId) },
            });
            return bookEntry;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch book');
        }
    }),
    createBookEntry: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookEntry = yield prisma.bookEntry.upsert({
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
    }),
    createBookSection: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const highestOrder = yield prisma.bookSection.aggregate({
                _max: {
                    order: true,
                },
            });
            const greatest = highestOrder._max.order || 0;
            const bookSection = yield prisma.bookSection.upsert({
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
    }),
    deleteBookEntry: (bookEntryId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(bookEntryId);
        try {
            yield prisma.bookEntry.delete({
                where: {
                    id: Number(bookEntryId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete book entry');
        }
    }),
    deleteBookSection: (bookSectionId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(bookSectionId);
        try {
            yield prisma.bookSection.delete({
                where: {
                    id: Number(bookSectionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete book section');
        }
    }),
};
export default bookServices;
