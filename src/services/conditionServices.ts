import { $Enums } from '@prisma/client';
import prisma from '../config/database.js';

const conditionServices = {
  getConditions: async () => {
    try {
      const conditions = await prisma.condition.findMany({
        orderBy: { name: 'asc' },
      });
      return conditions;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch conditions');
    }
  },

  getConditionById: async (conditionId: string) => {
    try {
      const condition = await prisma.condition.findUnique({
        where: { id: Number(conditionId) },
      });
      return condition;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch condition');
    }
  },

  createCondition: async (formData: {
    conditionId: string;
    name: string;
    description: string;
    type: $Enums.ConditionType;
  }) => {
    try {
      const newCondition = await prisma.condition.upsert({
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
      return newCondition;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update condition');
    }
  },

  deleteCondition: async (conditionId: string) => {
    try {
      await prisma.condition.delete({
        where: {
          id: Number(conditionId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete condition');
    }
  },
};

export default conditionServices;
