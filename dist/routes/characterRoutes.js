import express from 'express';
import authentication from '../middleware/authentication.js';
import characterController from '../controllers/characterController.js';
const router = express.Router();
router.get('/characters', authentication.authenticateUser, characterController.getCharacters);
router.post('/characters', authentication.authenticateUser, characterController.createCharacter);
export default router;
