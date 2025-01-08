import express from 'express';
import authentication from '../middleware/authentication.js';
import keywordConroller from '../controllers/keywordController.js';
const router = express.Router();
router.get('/keywords', authentication.authenticate, keywordConroller.getKeywords);
router.get('/keywords/:keywordId', authentication.authenticate, authentication.authenticateAdmin, keywordConroller.getKeywordById);
router.post('/keywords', authentication.authenticate, authentication.authenticateAdmin, keywordConroller.createKeyword);
export default router;
