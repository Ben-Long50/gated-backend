import { Request, Response } from 'express';
import actionServices from '../services/actionServices.js';

const actionConroller = {
  getActions: async (_req: Request, res: Response) => {
    try {
      const actions = await actionServices.getActions();
      res.status(200).json(actions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getActionById: async (req: Request, res: Response) => {
    try {
      const action = await actionServices.getActionById(req.params.actionId);
      res.status(200).json(action);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createAction: async (req: Request, res: Response) => {
    try {
      const action = await actionServices.createAction(req.body);
      res.status(200).json(action);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default actionConroller;
