import armorStatServices from '../services/armorStatServices.js';
const armorStatController = {
    editArmorPower: async (req, res) => {
        try {
            await armorStatServices.editArmorPower(req.params.armorId, req.body.value);
            res
                .status(200)
                .json({ message: `Changed current power by ${req.body.value}` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    refreshArmorPower: async (req, res) => {
        try {
            await armorStatServices.refreshArmorPower(req.params.armorId);
            res.status(200).json({ message: `Refreshed armor power` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    editArmorBlock: async (req, res) => {
        try {
            await armorStatServices.editArmorBlock(req.params.armorId, req.body.value);
            res
                .status(200)
                .json({ message: `Changed current block points by ${req.body.value}` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    refreshArmorBlock: async (req, res) => {
        try {
            await armorStatServices.refreshArmorBlock(req.params.armorId);
            res.status(200).json({ message: `Refreshed armor block points` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default armorStatController;
