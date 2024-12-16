var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userServices from '../services/userServices.js';
import perkServices from '../services/perkServices.js';
const perkController = {
    getAuthenticatedUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).json(req.user);
    }),
    getUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userServices.getAllUsers();
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userServices.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    createPerk: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const perk = yield perkServices.createPerk(req.body);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
export default perkController;
