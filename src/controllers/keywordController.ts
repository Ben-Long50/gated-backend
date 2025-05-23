import { Request, Response } from 'express';
import keywordServices from '../services/keywordServices.js';

const keywordController = {
  getKeywords: async (_req: Request, res: Response) => {
    try {
      const keywords = await keywordServices.getKeywords();
      res.status(200).json(keywords);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getKeywordById: async (req: Request, res: Response) => {
    try {
      const keyword = await keywordServices.getKeywordById(
        req.params.keywordId,
      );
      res.status(200).json(keyword);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createKeyword: async (req: Request, res: Response) => {
    try {
      const keyword = await keywordServices.createKeyword(req.body);
      res.status(200).json(keyword);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteKeyword: async (req: Request, res: Response) => {
    try {
      await keywordServices.deleteKeyword(req.params.keywordId);
      res.status(200).json({ message: 'Successfully deleted keyword' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default keywordController;
