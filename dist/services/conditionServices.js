import prisma from '../config/database.js';
const conditionServices = {
    getConditions: async () => {
        try {
            const conditions = await prisma.condition.findMany({
                orderBy: { name: 'asc' },
            });
            return conditions;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch conditions');
        }
    },
    getConditionById: async (conditionId) => {
        try {
            const condition = await prisma.condition.findUnique({
                where: { id: Number(conditionId) },
            });
            return condition;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch condition');
        }
    },
    createCondition: async (formData) => {
        try {
            await prisma.condition.upsert({
                where: { id: Number(formData.conditionId) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    conditionType: formData.type,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    conditionType: formData.type,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update condition');
        }
    },
    deleteCondition: async (conditionId) => {
        try {
            await prisma.condition.delete({
                where: {
                    id: Number(conditionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete condition');
        }
    },
};
export default conditionServices;
