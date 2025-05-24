import itemStatServices from '../services/itemStatServices.js';
const itemStatController = {
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
