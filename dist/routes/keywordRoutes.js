import express from 'express';
import authentication from '../middleware/authentication.js';
import keywordConroller from '../controllers/keywordController.js';
const router = express.Router();
router.get('/keywords', authentication.authenticateUser, keywordConroller.getKeywords);
router.get('/keywords/:keywordId', authentication.authenticateUser, keywordConroller.getKeywordById);
router.post('/keywords', authentication.authenticateUser, keywordConroller.createKeyword);
export default router;
