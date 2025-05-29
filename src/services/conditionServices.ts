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
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update condition');
    }
  },

  updateCharacterConditionStacks: async (
    conditionId: number,
    value: number,
  ) => {
    try {
      const conditionReference =
        await prisma.characterConditionReference.findUnique({
          where: { id: conditionId },
          select: { stacks: true },
        });

      if (!conditionReference) {
        throw new Error('Failed to find condition reference');
      }

      await prisma.characterConditionReference.update({
        where: { id: conditionId },
        data: {
          stacks: conditionReference?.stacks
            ? conditionReference?.stacks + value
            : value,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to udpate character condition stacks');
    }
  },

  updateItemConditionStacks: async (conditionId: number, value: number) => {
    try {
      const conditionReference = await prisma.itemConditionReference.findUnique(
        {
          where: { id: conditionId },
          select: { stacks: true },
        },
      );

      if (!conditionReference) {
        throw new Error('Failed to find condition reference');
      }

      await prisma.itemConditionReference.update({
        where: { id: conditionId },
        data: {
          stacks: conditionReference?.stacks
            ? conditionReference?.stacks + value
            : value,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to udpate item condition stacks');
    }
  },

  deleteCondition: async (conditionId: number) => {
    try {
      await prisma.condition.delete({
        where: {
          id: conditionId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete condition');
    }
  },

  deleteCharacterCondition: async (conditionId: number) => {
    try {
      await prisma.characterConditionReference.delete({
        where: {
          id: conditionId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete character condition');
    }
  },

  deleteItemCondition: async (conditionId: number) => {
    try {
      await prisma.itemConditionReference.delete({
        where: {
          id: conditionId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete item condition');
    }
  },
};

export default conditionServices;
