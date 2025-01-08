import express from 'express';
import authentication from '../middleware/authentication.js';
import characterController from '../controllers/characterController.js';

const router = express.Router();

router.get(
  '/characters',
  authentication.authenticate,
  characterController.getCharacters,
);

router.get(
  '/characters/:characterId',
  authentication.authenticate,
  characterController.getCharacterById,
);

router.post(
  '/characters',
  authentication.authenticate,
  characterController.createCharacter,
);

router.put(
  '/characters/:characterId',
  authentication.authenticate,
  characterController.updateCharacter,
);

router.delete(
  '/characters/:characterId',
  authentication.authenticate,
  characterController.deleteCharacter,
);

export default router;
