var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../config/database.js';
const errorServices = {
    getErrorReports: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errorReports = yield prisma.error.findMany({
                orderBy: { createdAt: 'asc' },
            });
            return errorReports;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch error reports');
        }
    }),
    createErrorReport: (formData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errorReport = yield prisma.error.create({
                data: {
                    title: formData.title,
                    content: formData.content,
                    userId,
                },
            });
            return errorReport;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or error report');
        }
    }),
};
export default errorServices;