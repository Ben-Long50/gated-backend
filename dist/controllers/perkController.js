import perkServices from '../services/perkServices.js';
const perkController = {
    getPerks: async (_req, res) => {
        try {
            const perks = await perkServices.getPerks();
            res.status(200).json(perks);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getPerkById: async (req, res) => {
        try {
            const perk = await perkServices.getPerkById(req.params.perkId);
            res.status(200).json(perk);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    createPerk: async (req, res) => {
        try {
            const perk = await perkServices.createPerk(req.body);
            res.status(200).json(perk);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    deletePerk: async (req, res) => {
        try {
            await perkServices.deletePerk(req.params.perkId);
            res.status(200).json({ message: 'Successfully deleted perk' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default perkController;
