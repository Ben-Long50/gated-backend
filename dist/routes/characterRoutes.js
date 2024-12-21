import express from 'express';
import authentication from '../middleware/authentication.js';
import characterController from '../controllers/characterController.js';
const router = express.Router();
router.get('/characters', authentication.authenticateUser, characterController.getCharacters);
router.get('/characters/:characterId', authentication.authenticateUser, characterController.getCharacterById);
router.post('/characters', authentication.authenticateUser, characterController.createCharacter);
router.put('/characters/:characterId', authentication.authenticateUser, characterController.updateCharacter);
export default router;
