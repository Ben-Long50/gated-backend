import express from 'express';
import authentication from '../middleware/authentication.js';
import bookController from '../controllers/bookController.js';

const router = express.Router();

router.get('/book', authentication.authenticateUser, bookController.getBook);

router.get(
  '/book/:bookEntryTitle',
  authentication.authenticateUser,
  bookController.getBookEntryByTitle,
);

router.post(
  '/book',
  authentication.authenticateUser,
  bookController.createBookEntry,
);

router.delete(
  '/book/:bookEntryId',
  authentication.authenticateUser,
  bookController.deleteBookEntry,
);

router.post('/book/image', bookController.uploadBookImage);

export default router;