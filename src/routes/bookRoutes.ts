import express from 'express';
import authentication from '../middleware/authentication.js';
import bookController from '../controllers/bookController.js';

const router = express.Router();

router.get(
  '/book/sections',
  authentication.authenticate,
  bookController.getBookSections,
);

router.get(
  '/book/:bookEntryId',
  authentication.authenticate,
  bookController.getBookEntry,
);

router.post(
  '/book',
  authentication.authenticate,
  authentication.authenticateAdmin,
  bookController.createBookEntry,
);

router.post(
  '/book/sections',
  authentication.authenticate,
  authentication.authenticateAdmin,
  bookController.createBookSection,
);

router.delete(
  '/book/:bookEntryId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  bookController.deleteBookEntry,
);

router.post('/book/image', bookController.uploadBookImage);

export default router;
