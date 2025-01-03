import weaponServices from '../services/weaponServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const weaponController = {
  getWeapons: async (req, res) => {
    try {
      const weapons = await weaponServices.getWeapons();
      res.status(200).json(weapons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getWeaponById: async (req, res) => {
    try {
      const weapon = await weaponServices.getWeaponById(req.params.weaponId);
      res.status(200).json(weapon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createWeapon: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        const weapon = await weaponServices.createWeapon(req.body);
        res.status(200).json(weapon);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  updateWeapon: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        const weapon = await weaponServices.updateWeapon(
          req.body,
          req.params.weaponId,
        );
        res.status(200).json(weapon);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteWeapon: async (req, res) => {
    try {
      await weaponServices.deleteWeapon(req.params.weaponId);
      res.status(200).json({ message: 'Successfully deleted weapon' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default weaponController;
