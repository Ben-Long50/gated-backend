import errorServices from '../services/errorServices.js';
const errorController = {
    getErrorReports: async (_req, res) => {
        try {
            const errorReports = await errorServices.getErrorReports();
            res.status(200).json(errorReports);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createErrorReport: async (req, res) => {
        try {
            if (!req.user) {
                throw new Error('Could not find authenticated user');
            }
            const errorReport = await errorServices.createErrorReport(req.body, req.user.id);
            res.status(200).json(errorReport);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteErrorReport: async (req, res) => {
        try {
            await errorServices.deleteErrorReport(req.params.errorId);
            res.status(200).json({ message: 'Successfully deleted error report' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default errorController;
