import keywordServices from '../services/keywordServices.js';

const keywordController = {
  getKeywords: async (req, res) => {
    try {
      const keywords = await keywordServices.getKeywords();
      res.status(200).json(keywords);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createKeyword: async (req, res) => {
    try {
      const keyword = await keywordServices.createKeyword(req.body);
      res.status(200).json(keyword);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default keywordController;
