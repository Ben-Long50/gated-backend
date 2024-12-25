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

  createKeyword: async (formData) => {
    try {
      const newKeyword = await prisma.keyword.create({
        data: {
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
