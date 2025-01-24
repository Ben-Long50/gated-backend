import actionServices from '../services/actionServices.js';
const actionController = {
    getActions: async (_req, res) => {
        try {
            const actions = await actionServices.getActions();
            res.status(200).json(actions);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getActionById: async (req, res) => {
        try {
            const action = await actionServices.getActionById(req.params.actionId);
            res.status(200).json(action);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    createAction: async (req, res) => {
        try {
            const action = await actionServices.createAction(req.body);
            res.status(200).json(action);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    deleteAction: async (req, res) => {
        try {
            await actionServices.deleteAction(req.params.actionId);
            res.status(200).json({ message: 'Successfully deleted action' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default actionController;
