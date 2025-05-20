var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import itemServices from '../services/itemServices.js';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import parseRequestBody from '../utils/parseRequestBody.js';
import characterServices from '../services/characterServices.js';
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
                if (!req.user) {
                    throw new Error('You must be signed in to complete this action');
                }
                const parsedBody = parseRequestBody(req.body);
                const character = await characterServices.getCharacterById(req.params.characterId);
                if (!character) {
                    throw new Error('This item must be associated with an existing character to modify it');
                }
                if (character.profits < parsedBody.upgradePrice) {
                    throw new Error('You do not have enough profits to purchase the chosen upgrades');
                }
                console.log(character.profits);
                const { upgradePrice } = parsedBody, itemInfo = __rest(parsedBody, ["upgradePrice"]);
                await characterServices.updateCharacter({
                    profits: character.profits - upgradePrice,
                }, req.user.id, character.id);
                await itemServices.createOrUpdateItem(itemInfo);
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
