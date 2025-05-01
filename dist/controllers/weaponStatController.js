import weaponStatServices from '../services/weaponStatServices.js';
const weaponStatController = {
    editWeaponAmmo: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await weaponStatServices.editWeaponAmmo(req.params.weaponId, req.body.value, req.user.id);
            res
                .status(200)
                .json({ message: `Changed current ammo count by ${req.body.value}` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    reloadWeapon: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('You must be logged in to perform this action');
            }
            await weaponStatServices.reloadWeapon(req.params.weaponId, req.user.id);
            res.status(200).json({ message: `Reloaded weapon` });
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
            await weaponStatServices.refreshAmmo(req.params.weaponId, req.user.id);
            res.status(200).json({ message: `Refreshed weapon ammunition` });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default weaponStatController;
