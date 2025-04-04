import { Request, Response } from 'express';
import sessionServices from '../services/sessionServices.js';

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
        req.params.sessionId,
      );
      res.status(200).json(session);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createSession: async (req: Request, res: Response) => {
    try {
      await sessionServices.createOrUpdateSession(req.body);
      res.status(200).json({ message: 'Successfully created session' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

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
