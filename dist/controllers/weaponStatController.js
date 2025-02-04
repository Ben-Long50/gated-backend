import weaponStatServices from '../services/weaponStatServices.js';
const weaponStatController = {
    editWeaponAmmo: async (req, res) => {
        try {
            await weaponStatServices.editWeaponAmmo(req.params.weaponId, req.body.value);
            res
                .status(200)
                .json({ message: `Changed current ammo count by ${req.body.value}` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    reloadWeapon: async (req, res) => {
        try {
            await weaponStatServices.reloadWeapon(req.params.weaponId);
            res.status(200).json({ message: `Reloaded weapon` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    refreshAmmo: async (req, res) => {
        try {
            await weaponStatServices.refreshAmmo(req.params.weaponId);
            res.status(200).json({ message: `Refreshed weapon ammunition` });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default weaponStatController;
