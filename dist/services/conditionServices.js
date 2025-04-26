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
    createCharacterCondition: async (characterId, formData) => {
        try {
            await prisma.conditionReference.upsert({
                where: {
                    conditionId_characterId: {
                        conditionId: Number(formData.conditionId),
                        characterId: Number(characterId),
                    },
                },
                update: {
                    stacks: Number(formData.stacks),
                },
                create: {
                    characterId: Number(characterId),
                    conditionId: Number(formData.conditionId),
                    stacks: Number(formData.stacks),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update character condition');
        }
    },
    deleteCharacterCondition: async (characterConditionId) => {
        try {
            await prisma.condition.delete({
                where: {
                    id: Number(characterConditionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete character condition');
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
