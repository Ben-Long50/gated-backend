import vehicleServices from '../services/vehicleServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
import parseRequestBody from '../utils/parseRequestBody.js';
const vehicleController = {
    getVehicles: async (_req, res) => {
        try {
            const vehicles = await vehicleServices.getVehicles();
            res.status(200).json(vehicles);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getVehicleMods: async (_req, res) => {
        try {
            const vehicleMods = await vehicleServices.getVehicleMods();
            res.status(200).json(vehicleMods);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getVehicleById: async (req, res) => {
        try {
            const vehicle = await vehicleServices.getVehicleById(req.params.vehicleId);
            res.status(200).json(vehicle);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getVehicleModById: async (req, res) => {
        try {
            const vehicleMod = await vehicleServices.getVehicleModById(req.params.modId);
            res.status(200).json(vehicleMod);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    createOrUpdateVehicle: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await vehicleServices.createOrUpdateVehicle(parsedBody);
                res.status(200).json({
                    message: req.body.vehicleId
                        ? 'Successfully updated vehicle'
                        : 'Successfully created vehicle',
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    modifyVehicle: [
        upload.single('picture'),
        uploadToCloudinary,
        async (req, res) => {
            try {
                const parsedBody = parseRequestBody(req.body);
                await vehicleServices.createOrUpdateVehicle(parsedBody);
                res.status(200).json({ message: 'Successfully modified vehicle' });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        },
    ],
    createOrUpdateVehicleMod: async (req, res) => {
        try {
            const vehicleMod = await vehicleServices.createOrUpdateVehicleMod(req.body);
            res.status(200).json(vehicleMod);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    deleteVehicle: async (req, res) => {
        try {
            await vehicleServices.deleteVehicle(req.params.vehicleId);
            res.status(200).json({ message: 'Successfully deleted vehicle' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    deleteVehicleMod: async (req, res) => {
        try {
            await vehicleServices.deleteVehicleMod(req.params.modId);
            res
                .status(200)
                .json({ message: 'Successfully deleted vehicle modification' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
export default vehicleController;
