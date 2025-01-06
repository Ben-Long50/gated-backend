import { Request, Response } from 'express';
import errorServices from '../services/errorServices.js';

const errorController = {
  getErrorReports: async (_req: Request, res: Response) => {
    try {
      const errorReports = await errorServices.getErrorReports();
      res.status(200).json(errorReports);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createErrorReport: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error('Could not find authenticated user');
      }
      const errorReport = await errorServices.createErrorReport(
        req.body,
        req.user.id,
      );
      res.status(200).json(errorReport);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default errorController;
