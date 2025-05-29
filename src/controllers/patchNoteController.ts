import { Request, Response } from 'express';
import patchNoteServices from '../services/patchNoteServices.js';

const patchNoteController = {
  getPatchNotes: async (_req: Request, res: Response) => {
    try {
      const patchNotes = await patchNoteServices.getPatchNotes();
      res.status(200).json(patchNotes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getPatchNoteById: async (req: Request, res: Response) => {
    try {
      const patchNote = await patchNoteServices.getPatchNoteById(
        req.params.patchNoteId,
      );
      res.status(200).json(patchNote);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createPatchNote: async (req: Request, res: Response) => {
    try {
      const patchNote = await patchNoteServices.createPatchNote(req.body);
      res.status(200).json(patchNote);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePatchNote: async (req: Request, res: Response) => {
    try {
      await patchNoteServices.deletePatchNote(req.params.patchNoteId);
      res.status(200).json({ message: 'Patch note successfully deleted' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default patchNoteController;
