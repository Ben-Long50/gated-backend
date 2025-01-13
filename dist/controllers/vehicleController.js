var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import vehicleServices from '../services/vehicleServices.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import upload from '../utils/multer.js';
const vehicleController = {
    getVehicles: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicles = yield vehicleServices.getVehicles();
            res.status(200).json(vehicles);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    getVehicleById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const vehicle = yield vehicleServices.getVehicleById(req.params.vehicleId);
            res.status(200).json(vehicle);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createVehicle: [
        upload.single('picture'),
        uploadToCloudinary,
        (req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const vehicle = yield vehicleServices.createVehicle(req.body);
                res.status(200).json(vehicle);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
            }
        }),
    ],
    deleteVehicleByName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield vehicleServices.deleteVehicleByName(req.params.vehicleName);
            res.status(200).json({ message: 'Successfully deleted vehicle' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    deleteVehicle: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield vehicleServices.deleteVehicle(req.params.vehicleId);
            res.status(200).json({ message: 'Successfully deleted vehicle' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default vehicleController;
