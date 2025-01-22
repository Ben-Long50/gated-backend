var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import conditionServices from '../services/conditionServices.js';
const conditionController = {
    getConditions: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conditions = yield conditionServices.getConditions();
            res.status(200).json(conditions);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    getConditionById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const condition = yield conditionServices.getConditionById(req.params.conditionId);
            res.status(200).json(condition);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createCondition: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const condition = yield conditionServices.createCondition(req.body);
            res.status(200).json(condition);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    deleteCondition: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield conditionServices.deleteCondition(req.params.conditionId);
            res.status(200).json({ message: 'Successfully deleted condition' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default conditionController;
