import cyberneticServices from '../services/cyberneticServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const cyberneticController = {
  getCybernetics: async (req, res) => {
    try {
      const cybernetics = await cyberneticServices.getCybernetics();
      res.status(200).json(cybernetics);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCyberneticById: async (req, res) => {
    try {
      const cybernetic = await cyberneticServices.getCyberneticById(
        req.params.cyberneticId,
      );
      res.status(200).json(cybernetic);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCybernetic: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        const cybernetic = await cyberneticServices.createCybernetic(req.body);
        res.status(200).json(cybernetic);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  updateCybernetic: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        const cybernetic = await cyberneticServices.updateCybernetic(
          req.body,
          req.params.cyberneticId,
        );
        res.status(200).json(cybernetic);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteCybernetic: async (req, res) => {
    try {
      await cyberneticServices.deleteCybernetic(req.params.cyberneticId);
      res.status(200).json({ message: 'Successfully deleted cybernetic' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cyberneticController;
