import express from 'express';
import authentication from '../middleware/authentication.js';
import keywordController from '../controllers/keywordController.js';
const router = express.Router();
router.get('/keywords', authentication.authenticate, keywordController.getKeywords);
router.get('/keywords/:keywordId', authentication.authenticate, authentication.authenticateAdmin, keywordController.getKeywordById);
router.post('/keywords', authentication.authenticate, authentication.authenticateAdmin, keywordController.createKeyword);
router.delete('/keywords/:keywordId', authentication.authenticate, authentication.authenticateAdmin, keywordController.deleteKeyword);
export default router;
