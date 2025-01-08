import express from 'express';
import authentication from '../middleware/authentication.js';
import bookController from '../controllers/bookController.js';

const router = express.Router();

router.get('/book', authentication.authenticate, bookController.getBook);

router.get(
  '/book/:bookEntryTitle',
  authentication.authenticate,
  bookController.getBookEntryByTitle,
);

router.post(
  '/book',
  authentication.authenticate,
  authentication.authenticateAdmin,
  bookController.createBookEntry,
);

router.delete(
  '/book/:bookEntryId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  bookController.deleteBookEntry,
);

router.post('/book/image', bookController.uploadBookImage);

export default router;
