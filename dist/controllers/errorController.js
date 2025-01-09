var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import errorServices from '../services/errorServices.js';
const errorController = {
    getErrorReports: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errorReports = yield errorServices.getErrorReports();
            res.status(200).json(errorReports);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    createErrorReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            const errorReport = yield errorServices.createErrorReport(req.body, req.user.id);
            res.status(200).json(errorReport);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
    deleteErrorReport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield errorServices.deleteErrorReport(req.params.errorId);
            res.status(200).json({ message: 'Successfully deleted error report' });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    }),
};
export default errorController;
