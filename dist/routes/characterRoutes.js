import express from 'express';
import authentication from '../middleware/authentication.js';
import characterController from '../controllers/characterController.js';
import characterStatController from '../controllers/characterStatController.js';
import affiliationController from '../controllers/affiliationController.js';
const router = express.Router();
router.get('/characters', authentication.authenticate, characterController.getCharacters);
router.get('/characters/batch', authentication.authenticate, characterController.getBatchCharacters);
router.get('/characters/active', authentication.authenticate, characterController.getActiveCharacter);
router.get('/characters/:characterId', authentication.authenticate, characterController.getCharacterById);
// router.get(
//   '/characters/:characterId/inventory/:inventoryId/equipment',
//   authentication.authenticate,
//   characterController.getEquippedItems,
// );
router.patch('/characters/:characterId/inventory/:inventoryId/equipment/:itemId', authentication.authenticate, characterController.toggleEquipment);
router.patch('/characters/active', authentication.authenticate, characterController.setActiveCharacter);
router.patch('/characters/:characterId/stats/currentHealth', authentication.authenticate, characterStatController.editCurrentHealth);
router.patch('/characters/:characterId/stats/currentSanity', authentication.authenticate, characterStatController.editCurrentSanity);
router.patch('/characters/:characterId/profits', authentication.authenticate, characterStatController.editProfits);
router.patch('/characters/:characterId/cart/:cartId', authentication.authenticate, characterController.editCart);
router.post('/characters/:characterId/inventory/:inventoryId', authentication.authenticate, characterController.completePurchase);
router.post('/characters', authentication.authenticate, characterController.createCharacter);
router.post('/characters/:characterId/affiliations/create', authentication.authenticate, affiliationController.createCharacterAffiliation);
router.post('/characters/:characterId/conditions', authentication.authenticate, characterController.createCharacterConditions);
router.put('/characters/:characterId', authentication.authenticate, characterController.updateCharacter);
router.put('/characters/:characterId/cart/:cartId', authentication.authenticate, characterController.clearCart);
router.delete('/characters/:characterId', authentication.authenticate, characterController.deleteCharacter);
export default router;
