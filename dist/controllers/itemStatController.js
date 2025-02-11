import itemStatServices from '../services/itemStatServices.js';
const itemStatController = {
    editItemPower: async (req, res) => {
        try {
            await itemStatServices.editItemPower(req.params.itemId, req.body.value);
            res
                .status(200)
                .json({ message: `Changed item power by ${req.body.value}` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    refreshItemPower: async (req, res) => {
        try {
            await itemStatServices.refreshItemPower(req.params.itemId);
            res.status(200).json({ message: `Refreshed item power` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    editItemStacks: async (req, res) => {
        try {
            await itemStatServices.editItemStacks(req.params.itemId, req.body.value);
            res
                .status(200)
                .json({ message: `Changed item stacks by ${req.body.value}` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    refreshItemStacks: async (req, res) => {
        try {
            await itemStatServices.refreshItemStacks(req.params.itemId);
            res.status(200).json({ message: `Refreshed item stacks` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default itemStatController;
