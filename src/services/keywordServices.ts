import { KeywordType } from '@prisma/client';
import prisma from '../config/database.js';
import { Keyword } from '../types/keyword.js';

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
    gpCost: number;
  }) => {
    const { keywordId, ...data } = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => Boolean(value)),
    ) as unknown as Keyword;

    try {
      const newKeyword = await prisma.keyword.upsert({
        where: { id: Number(keywordId) || 0 },
        update: data,
        create: data,
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
