import { KeywordType } from '@prisma/client';
import prisma from '../config/database.js';

const keywordServices = {
  getKeywords: async () => {
    try {
      const keywords = await prisma.keyword.findMany({
        orderBy: { name: 'asc' },
      });
      return keywords;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch keywords');
    }
  },

  getKeywordById: async (keywordId: string) => {
    try {
      const keyword = await prisma.keyword.findUnique({
        where: { id: Number(keywordId) },
      });
      return keyword;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch keyword');
    }
  },

  createKeyword: async (formData: {
    keywordId: string;
    name: string;
    description: string;
    keywordType: KeywordType;
  }) => {
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
      console.error(error);
      throw new Error('Failed to create or update keyword');
    }
  },

  deleteKeyword: async (keywordId: string) => {
    try {
      await prisma.keyword.delete({
        where: {
          id: Number(keywordId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete keyword');
    }
  },
};

export default keywordServices;
