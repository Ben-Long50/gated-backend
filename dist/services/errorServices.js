import prisma from '../config/database.js';
const errorServices = {
    getErrorReports: async () => {
        try {
            const errorReports = await prisma.error.findMany({
                include: { user: true },
                orderBy: { createdAt: 'desc' },
            });
            return errorReports;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch error reports');
        }
    },
    createErrorReport: async (formData, userId) => {
        try {
            const errorReport = await prisma.error.create({
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
            throw new Error('Failed to create error report');
        }
    },
    deleteErrorReport: async (errorId) => {
        try {
            await prisma.error.delete({
                where: {
                    id: Number(errorId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete error report');
        }
    },
};
export default errorServices;
