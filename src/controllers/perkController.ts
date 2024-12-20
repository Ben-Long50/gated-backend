import userServices from '../services/userServices.js';
import perkServices from '../services/perkServices.js';

const perkController = {
  getPerks: async (req, res) => {
    try {
      const perks = await perkServices.getPerks();
      res.status(200).json(perks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await userServices.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPerk: async (req, res) => {
    try {
      const perk = await perkServices.createPerk(req.body);
      res.status(200).json(perk);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default perkController;
