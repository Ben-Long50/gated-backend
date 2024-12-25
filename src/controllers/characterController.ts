import characterServices from '../services/characterServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';

const characterController = {
  getCharacters: async (req, res) => {
    try {
      const characters = await characterServices.getCharacters(req.user.id);
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCharacterById: async (req, res) => {
    try {
      console.log(req.params.characterId);

      const character = await characterServices.getCharacterById(
        req.params.characterId,
      );
      res.status(200).json(character);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCharacter: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        const character = await characterServices.createCharacter(
          req.body,
          req.user.id,
        );
        res.status(200).json(character);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  updateCharacter: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req, res) => {
      try {
        const character = await characterServices.updateCharacter(
          req.body,
          req.user.id,
          req.params.characterId,
        );
        res.status(200).json(character);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  ],

  deleteCharacter: async (req, res) => {
    try {
      await characterServices.deleteCharacter(
        req.user.id,
        req.params.characterId,
      );
      res.status(200).json({ message: 'Successfully deleted character' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default characterController;
