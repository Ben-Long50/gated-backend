var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import prisma from '../config/database.js';
const keywordServices = {
    getKeywords: async () => {
        try {
            const keywords = await prisma.keyword.findMany({
                orderBy: { name: 'asc' },
            });
            return keywords;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch keywords');
        }
    },
    getKeywordById: async (keywordId) => {
        try {
            const keyword = await prisma.keyword.findUnique({
                where: { id: Number(keywordId) },
            });
            return keyword;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch keyword');
        }
    },
    createKeyword: async (formData) => {
        const _a = Object.fromEntries(Object.entries(formData).filter(([_, value]) => Boolean(value))), { keywordId } = _a, data = __rest(_a, ["keywordId"]);
        try {
            const newKeyword = await prisma.keyword.upsert({
                where: { id: Number(keywordId) || 0 },
                update: data,
                create: data,
            });
            return newKeyword;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update keyword');
        }
    },
    deleteKeyword: async (keywordId) => {
        try {
            await prisma.keyword.delete({
                where: {
                    id: Number(keywordId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete keyword');
        }
    },
};
export default keywordServices;
