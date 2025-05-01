import { Request, Response } from 'express';
import bookServices from '../services/bookServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const bookController = {
  getBookSections: async (_req: Request, res: Response) => {
    try {
      const book = await bookServices.getBookSections();
      res.status(200).json(book);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookEntry: async (req: Request, res: Response) => {
    try {
      const bookEntry = await bookServices.getBookEntry(req.params.bookEntryId);
      res.status(200).json(bookEntry);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createBookEntry: async (req: Request, res: Response) => {
    try {
      const bookEntry = await bookServices.createBookEntry(req.body);
      res.status(200).json(bookEntry);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createBookSection: async (req: Request, res: Response) => {
    try {
      const bookSection = await bookServices.createBookSection(req.body);
      res.status(200).json(bookSection);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBookEntry: async (req: Request, res: Response) => {
    try {
      await bookServices.deleteBookEntry(req.params.bookEntryId);
      res.status(200).json({ message: 'Book entry successfully deleted' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBookSection: async (req: Request, res: Response) => {
    try {
      await bookServices.deleteBookSection(req.params.bookSectionId);
      res.status(200).json({ message: 'Book section successfully deleted' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  uploadBookImage: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        res.status(200).json(req.body.imageUrl);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],
};

export default bookController;
