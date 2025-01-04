import armorServices from '../services/armorServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const armorController = {
  getArmor: async (req, res) => {
    try {
      const armors = await armorServices.getArmor();
      res.status(200).json(armors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getArmorById: async (req, res) => {
    try {
      const armor = await armorServices.getArmorById(req.params.armorId);
      res.status(200).json(armor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createArmor: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        const armor = await armorServices.createArmor(req.body);
        res.status(200).json(armor);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteArmor: async (req, res) => {
    try {
      await armorServices.deleteArmor(req.params.armorId);
      res.status(200).json({ message: 'Successfully deleted armor' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default armorController;
