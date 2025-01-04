import prisma from '../config/database.js';

const keywordServices = {
  getKeywords: async () => {
    try {
      const keywords = await prisma.keyword.findMany({
        orderBy: { name: 'asc' },
      });
      return keywords;
    } catch (error) {
      throw new Error('Failed to fetch keywords');
    }
  },

  getKeywordById: async (keywordId) => {
    try {
      const keyword = await prisma.keyword.findUnique({
        where: { id: Number(keywordId) },
      });
      return keyword;
    } catch (error) {
      throw new Error('Failed to fetch keyword');
    }
  },

  createKeyword: async (formData) => {
    try {
      const newKeyword = await prisma.keyword.upsert({
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
    } catch (error) {
      throw new Error('Failed to create keyword');
    }
  },
};

export default keywordServices;