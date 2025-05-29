import conditionServices from '../services/conditionServices.js';
const conditionController = {
    getConditions: async (_req, res) => {
        try {
            const conditions = await conditionServices.getConditions();
            res.status(200).json(conditions);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getConditionById: async (req, res) => {
        try {
            const condition = await conditionServices.getConditionById(req.params.conditionId);
            res.status(200).json(condition);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createCondition: async (req, res) => {
        try {
            await conditionServices.createCondition(req.body);
            res.status(200).json({ message: 'Successfully created condition' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateConditionStacks: async (req, res) => {
        try {
            if (req.params.characterId) {
                await conditionServices.updateCharacterConditionStacks(Number(req.params.conditionId), req.body.value);
            }
            if (req.params.itemId) {
                await conditionServices.updateItemConditionStacks(Number(req.params.conditionId), req.body.value);
            }
            res
                .status(200)
                .json({ message: 'Successfully updated condition stacks' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteCondition: async (req, res) => {
        try {
            await conditionServices.deleteCondition(req.params.conditionId);
            res.status(200).json({ message: 'Successfully deleted condition' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default conditionController;
