import armorStatServices from '../services/armorStatServices.js';
const armorStatController = {
    editArmorPower: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await armorStatServices.editArmorPower(req.params.armorId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed current power by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    refreshArmorPower: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await armorStatServices.refreshArmorPower(req.params.armorId, req.user.id);
            res.status(200).json({ message: `Refreshed armor power` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    editArmorBlock: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await armorStatServices.editArmorBlock(req.params.armorId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed current block points by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    refreshArmorBlock: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await armorStatServices.refreshArmorBlock(req.params.armorId, req.user.id);
            res.status(200).json({ message: `Refreshed armor block points` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default armorStatController;
