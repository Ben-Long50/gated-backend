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
  '/book/entries/:bookEntryId',
  authentication.authenticate,
  bookController.getBookEntry,
);

router.post(
  '/book/entries',
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
  '/book/entries/:bookEntryId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  bookController.deleteBookEntry,
);

router.delete(
  '/book/sections/:bookSectionId',
  authentication.authenticate,
  authentication.authenticateAdmin,
  bookController.deleteBookSection,
);

router.post('/book/image', bookController.uploadBookImage);

export default router;
