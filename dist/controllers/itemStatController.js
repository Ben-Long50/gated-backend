import itemStatServices from '../services/itemStatServices.js';
const itemStatController = {
    editItemPower: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.editItemPower(req.params.itemId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed item power by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    refreshItemPower: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.refreshItemPower(req.params.itemId, req.user.id);
            res.status(200).json({ message: `Refreshed item power` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    editItemStacks: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.editItemStacks(req.params.itemId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed item stacks by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    refreshItemStacks: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.refreshItemStacks(req.params.itemId, req.user.id);
            res.status(200).json({ message: `Refreshed item stacks` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default itemStatController;
