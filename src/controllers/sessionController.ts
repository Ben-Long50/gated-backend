import { Request, Response } from 'express';
import sessionServices from '../services/sessionServices.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const sessionController = {
  getCampaignSessions: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res
          .status(401)
          .json({ error: 'You must be signed in to use this function' });
        return;
      }

      const sessions = await sessionServices.getCampaignSessions(
        req.params.campaignId,
      );
      res.status(200).json(sessions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getSessionById: async (req: Request, res: Response) => {
    try {
      const session = await sessionServices.getSessionById(
        Number(req.params.campaignId),
        Number(req.params.sessionId),
      );
      res.status(200).json(session);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getSessionNotes: async (req: Request, res: Response) => {
    try {
      const notes = await sessionServices.getSessionNotes(
        Number(req.params.sessionId),
        Number(req.params.characterId),
      );
      res.status(200).json(notes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createOrUpdateSessionNotes: async (req: Request, res: Response) => {
    try {
      await sessionServices.createOrUpdateSessionNotes(
        Number(req.params.sessionId),
        Number(req.params.characterId),
        req.body.content,
      );
      res
        .status(200)
        .json({ message: 'Successfully created or updated session notes' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createOrUpdateSession: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await sessionServices.createOrUpdateSession(
          parsedBody,
          Number(req.params.campaignId),
        );
        res.status(200).json({ message: 'Successfully created session' });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  deleteSession: async (req: Request, res: Response) => {
    try {
      await sessionServices.deleteSession(req.params.campaignId);
      res.status(200).json({ message: 'Successfully deleted session' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default sessionController;
