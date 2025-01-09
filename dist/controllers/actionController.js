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
const actionController = {
    getActions: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actions = yield actionServices.getActions();
            res.status(200).json(actions);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    getActionById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const action = yield actionServices.getActionById(req.params.actionId);
            res.status(200).json(action);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createAction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const action = yield actionServices.createAction(req.body);
            res.status(200).json(action);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    deleteAction: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield actionServices.deleteAction(req.params.actionId);
            res.status(200).json({ message: 'Successfully deleted action' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default actionController;
