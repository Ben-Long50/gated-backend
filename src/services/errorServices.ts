import prisma from '../config/database.js';

const errorServices = {
  getErrorReports: async () => {
    try {
      const errorReports = await prisma.error.findMany({
        orderBy: { createdAt: 'asc' },
      });
      return errorReports;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch error reports');
    }
  },

  createErrorReport: async (
    formData: {
      title: string;
      content: string;
    },
    userId: number,
  ) => {
    try {
      const errorReport = await prisma.error.create({
        data: {
          title: formData.title,
          content: formData.content,
          userId,
        },
      });
      return errorReport;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create error report');
    }
  },

  deleteErrorReport: async (errorId: string) => {
    try {
      await prisma.error.delete({
        where: {
          id: Number(errorId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete error report');
    }
  },
};

export default errorServices;
