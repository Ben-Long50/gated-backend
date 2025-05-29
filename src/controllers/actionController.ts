import { Request, Response } from 'express';
import actionServices from '../services/actionServices.js';

const actionController = {
  getActions: async (_req: Request, res: Response) => {
    try {
      const actions = await actionServices.getActions();
      res.status(200).json(actions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getActionById: async (req: Request, res: Response) => {
    try {
      const action = await actionServices.getActionById(req.params.actionId);
      res.status(200).json(action);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createAction: async (req: Request, res: Response) => {
    try {
      await actionServices.createAction(req.body);
      res.status(200).json({ message: 'Successfully created action' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteAction: async (req: Request, res: Response) => {
    try {
      await actionServices.deleteAction(req.params.actionId);
      res.status(200).json({ message: 'Successfully deleted action' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default actionController;
