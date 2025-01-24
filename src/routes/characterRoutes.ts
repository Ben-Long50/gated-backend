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
  '/characters/active',
  authentication.authenticate,
  characterController.getActiveCharacter,
);

router.get(
  '/characters/:characterId',
  authentication.authenticate,
  characterController.getCharacterById,
);

router.patch(
  '/characters/active',
  authentication.authenticate,
  characterController.setActiveCharacter,
);

router.patch(
  '/characters/:characterId/cart',
  authentication.authenticate,
  characterController.addToCart,
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

router.put(
  '/characters/:characterId/cart',
  authentication.authenticate,
  characterController.clearCart,
);

router.delete(
  '/characters/:characterId',
  authentication.authenticate,
  characterController.deleteCharacter,
);

export default router;
