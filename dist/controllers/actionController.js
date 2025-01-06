var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import actionServices from '../services/actionServices.js';
const actionConroller = {
    getActions: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actions = yield actionServices.getActions();
            res.status(200).json(actions);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    getActionById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const action = yield actionServices.getActionById(req.params.actionId);
            res.status(200).json(action);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
    createAction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const action = yield actionServices.createAction(req.body);
            res.status(200).json(action);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }),
};
export default actionConroller;
