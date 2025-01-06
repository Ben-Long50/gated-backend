import { Request, Response } from 'express';
import cyberneticServices from '../services/cyberneticServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const cyberneticController = {
  getCybernetics: async (_req: Request, res: Response) => {
    try {
      const cybernetics = await cyberneticServices.getCybernetics();
      res.status(200).json(cybernetics);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getCyberneticById: async (req: Request, res: Response) => {
    try {
      const cybernetic = await cyberneticServices.getCyberneticById(
        req.params.cyberneticId,
      );
      res.status(200).json(cybernetic);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createCybernetic: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const cybernetic = await cyberneticServices.createCybernetic(req.body);
        res.status(200).json(cybernetic);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  deleteCybernetic: async (req: Request, res: Response) => {
    try {
      await cyberneticServices.deleteCybernetic(req.params.cyberneticId);
      res.status(200).json({ message: 'Successfully deleted cybernetic' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default cyberneticController;
