import { Request, Response } from 'express';
import conditionServices from '../services/conditionServices.js';

const conditionController = {
  getConditions: async (_req: Request, res: Response) => {
    try {
      const conditions = await conditionServices.getConditions();
      res.status(200).json(conditions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getConditionById: async (req: Request, res: Response) => {
    try {
      const condition = await conditionServices.getConditionById(
        req.params.conditionId,
      );
      res.status(200).json(condition);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createCondition: async (req: Request, res: Response) => {
    try {
      await conditionServices.createCondition(req.body);
      res.status(200).json({ message: 'Successfully created condition' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createCharacterCondition: async (req: Request, res: Response) => {
    try {
      await conditionServices.createCharacterCondition(
        req.params.characterId,
        req.body,
      );
      res.status(200).json({
        message: `Successfully applied condition to character ${req.params.characterId}`,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCharacterCondition: async (req: Request, res: Response) => {
    try {
      await conditionServices.deleteCharacterCondition(
        req.params.characterConditionId,
      );
      res
        .status(200)
        .json({ message: 'Successfully deleted character condition' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCondition: async (req: Request, res: Response) => {
    try {
      await conditionServices.deleteCondition(req.params.conditionId);
      res.status(200).json({ message: 'Successfully deleted condition' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default conditionController;
