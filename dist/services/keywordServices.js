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
const keywordServices = {
    getKeywords: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keywords = yield prisma.keyword.findMany({
                orderBy: { name: 'asc' },
            });
            return keywords;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch keywords');
        }
    }),
    getKeywordById: (keywordId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keyword = yield prisma.keyword.findUnique({
                where: { id: Number(keywordId) },
            });
            return keyword;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch keyword');
        }
    }),
    createKeyword: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newKeyword = yield prisma.keyword.upsert({
                where: { id: Number(formData.keywordId) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    keywordType: formData.keywordType,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    keywordType: formData.keywordType,
                },
            });
            return newKeyword;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update keyword');
        }
    }),
};
export default keywordServices;
