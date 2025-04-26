import characterServices from '../services/characterServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
const characterController = {
    getCharacters: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            const characters = await characterServices.getCharacters(req.user.id);
            res.status(200).json(characters);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getActiveCharacter: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            const activeCharacter = await characterServices.getActiveCharacter(req.user.id);
            res.status(200).json(activeCharacter);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getCharacterById: async (req, res) => {
        try {
            const character = await characterServices.getCharacterById(req.params.characterId);
            res.status(200).json(character);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    setActiveCharacter: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            const activeCharacter = await characterServices.setActiveCharacter(req.user.id, req.body.characterId);
            res.status(200).json(activeCharacter);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getEquippedItems: async (req, res) => {
        try {
            const equipment = await characterServices.getEquippedItems(req.params.characterId, req.params.inventoryId);
            res.status(200).json(equipment);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    toggleEquipment: async (req, res) => {
        try {
            await characterServices.toggleEquipment(req.params.inventoryId, req.params.itemId, req.body.category);
            res.status(200).json({ message: 'Successfully toggled equipment' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    editCart: async (req, res) => {
        try {
            await characterServices.editCart(req.params.characterId, req.params.cartId, req.body.category, req.body.itemId);
            res.status(200).json({ message: 'Successfully added item to cart' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    completePurchase: async (req, res) => {
        try {
            await characterServices.addToInventory(req.params.characterId, req.params.inventoryId, req.body);
            await characterServices.clearCart(req.params.characterId);
            res.status(200).json({ message: 'Purchase completed' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    clearCart: async (req, res) => {
        try {
            await characterServices.clearCart(req.params.characterId);
            res.status(200).json({ message: 'Cart cleared' });
        }
        catch (error) { }
    },
    createCharacter: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                if (!req.user) {
                    throw new Error('Could not find authenticated user');
                }
                const parsedBody = parseRequestBody(req.body);
                const character = await characterServices.createCharacter(parsedBody, req.user.id);
                res.status(200).json(character);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    updateCharacter: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                if (!req.user) {
                    throw new Error('Could not find authenticated user');
                }
                const parsedBody = parseRequestBody(req.body);
                const character = await characterServices.updateCharacter(parsedBody, req.user.id, Number(req.params.characterId));
                res.status(200).json(character);
            }
            catch (error) {
                console.error(error);
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    deleteCharacter: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            await characterServices.deleteCharacter(req.user.id, req.params.characterId);
            res.status(200).json({ message: 'Successfully deleted character' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default characterController;
