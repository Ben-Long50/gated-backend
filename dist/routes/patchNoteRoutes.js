import express from 'express';
import authentication from '../middleware/authentication.js';
import patchNoteController from '../controllers/patchNoteController.js';
const router = express.Router();
router.get('/patchNotes', authentication.authenticate, patchNoteController.getPatchNotes);
router.get('/patchNotes/:patchNoteId', authentication.authenticate, patchNoteController.getPatchNoteById);
router.post('/patchNotes', authentication.authenticate, authentication.authenticateAdmin, patchNoteController.createPatchNote);
router.delete('/patchNotes/:patchNoteId', authentication.authenticate, authentication.authenticateAdmin, patchNoteController.deletePatchNote);
export default router;
