import itemStatServices from '../services/itemStatServices.js';
const itemStatController = {
    editItemAmmo: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.editItemAmmo(req.params.itemId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed current ammo count by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    reloadItem: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.reloadItem(req.params.itemId, req.user.id);
            res.status(200).json({ message: `Reloaded item` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    refreshAmmo: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.refreshAmmo(req.params.itemId, req.user.id);
            res.status(200).json({ message: `Refreshed item ammunition` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
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
    editItemBlock: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.editItemBlock(req.params.itemId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed current block points by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    refreshItemBlock: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.refreshItemBlock(req.params.itemId, req.user.id);
            res.status(200).json({ message: `Refreshed item block points` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    editItemHull: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.editItemHull(req.params.itemId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed current hull by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    editItemCargo: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.editItemCargo(req.params.itemId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed current cargo count by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    editItemPass: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await itemStatServices.editItemPass(req.params.itemId, req.body.value, req.user.id);
            res.status(200).json({
                message: `Changed current passenger count by ${req.body.value}`,
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default itemStatController;
