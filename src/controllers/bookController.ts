import bookServices from '../services/bookServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const bookController = {
  getBook: async (req, res) => {
    try {
      const book = await bookServices.getBook();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBookEntryByTitle: async (req, res) => {
    try {
      const bookEntry = await bookServices.getBookEntryByTitle(
        req.params.bookEntryTitle.toLowerCase(),
      );
      res.status(200).json(bookEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createBookEntry: async (req, res) => {
    try {
      const bookEntry = await bookServices.createBookEntry(req.body);
      res.status(200).json(bookEntry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteBookEntry: async (req, res) => {
    try {
      await bookServices.deleteBookEntry(req.params.bookEntryId);
      res.status(200).json({ message: 'Book entry successfully deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  uploadBookImage: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        res.status(200).json(req.body.imageUrl);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],
};

export default bookController;