import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import userServices from '../services/userServices.js';
import perkServices from '../services/perkServices.js';

const perkController = {
  getAuthenticatedUser: async (req, res) => {
    res.status(200).json(req.user);
  },

  getUsers: async (req, res) => {
    try {
      const users = await userServices.getAllUsers();
      res.json(users);
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
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPerk: async (req, res) => {
    try {
      const perk = await perkServices.createPerk(req.body);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default perkController;
