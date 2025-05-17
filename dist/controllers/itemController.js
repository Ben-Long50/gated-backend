import itemServices from '../services/itemServices.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import parseRequestBody from '../utils/parseRequestBody.js';
const itemController = {
    getItems: async (_req, res) => {
        try {
            const items = await itemServices.getItems();
            res.status(200).json(items);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getItemById: async (req, res) => {
        try {
            const item = await itemServices.getItemById(req.params.itemId);
            if (!item) {
                throw new Error('Item not found');
            }
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrUpdateItem: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody);
                res.status(200).json({
                    message: parsedBody.id
                        ? 'Successfully updated item'
                        : 'Successfully created item',
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    ],
    modifyItem: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await itemServices.createOrUpdateItem(parsedBody);
                res.status(200).json({ message: 'Successfully modified item' });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        },
    ],
    deleteItem: async (req, res) => {
        try {
            await itemServices.deleteItem(req.params.itemId);
            res.status(200).json({ message: 'Successfully deleted item' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default itemController;
