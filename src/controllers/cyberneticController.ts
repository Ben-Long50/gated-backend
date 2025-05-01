import { Request, Response } from 'express';
import cyberneticServices from '../services/cyberneticServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import { destructureLinkReference } from '../utils/destructureItemLinks.js';

const cyberneticController = {
  getCybernetics: async (_req: Request, res: Response) => {
    try {
      const cybernetics = await cyberneticServices.getCybernetics();

      const cyberneticData = cybernetics.map((cybernetic) =>
        destructureLinkReference(cybernetic),
      );

      res.status(200).json(cyberneticData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  getCyberneticById: async (req: Request, res: Response) => {
    try {
      const cybernetic = await cyberneticServices.getCyberneticById(
        req.params.cyberneticId,
      );

      const cyberneticData = destructureLinkReference(cybernetic);

      res.status(200).json(cyberneticData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  createOrUpdateCybernetic: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await cyberneticServices.createOrUpdateCybernetic(parsedBody);
        res.status(200).json({
          message: req.body.cyberneticId
            ? 'Successfully updated cybernetic'
            : 'Successfully created cybernetic',
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  modifyCybernetic: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        const parsedBody = parseRequestBody(req.body);

        await cyberneticServices.createOrUpdateCybernetic(parsedBody);
        res.status(200).json({ message: 'Successfully modified cybernetic' });
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
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cyberneticController;
