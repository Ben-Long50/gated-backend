import { ModifierType, ValueType } from '@prisma/client';
import prisma from '../config/database.js';

const perkServices = {
  getPerks: async () => {
    try {
      const perks = await prisma.perk.findMany({
        include: { modifiers: { include: { action: true } } },
        orderBy: { name: 'asc' },
      });
      return perks;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch perks');
    }
  },

  getPerkById: async (perkId: string) => {
    try {
      const perk = await prisma.perk.findUnique({
        where: { id: Number(perkId) },
        include: { modifiers: { include: { action: true } } },
      });
      return perk;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch perk');
    }
  },

  createPerk: async (formData: {
    perkId: string;
    name: string;
    description: string;
    modifiers: {
      stat?: string;
      action?: string;
      attribute?: string;
      operator: string;
      skill?: string;
      type: ModifierType;
      value?: number;
      valueType: ValueType;
    }[];
    requirements: object;
  }) => {
    try {
      const oldPerk = await prisma.perk.findUnique({
        where: { id: Number(formData.perkId) || 0 },
        select: { modifiers: { select: { id: true } } },
      });

      if (oldPerk) {
        const oldModifierIds = oldPerk.modifiers.map((modifier) => modifier.id);
        await prisma.modifier.deleteMany({
          where: { id: { in: oldModifierIds } },
        });
      }

      const newUser = await prisma.perk.upsert({
        where: { id: Number(formData.perkId) || 0 },
        update: {
          name: formData.name,
          description: formData.description,
          modifiers: {
            createMany: {
              data: formData.modifiers.map(({ action, ...modifier }) => ({
                ...modifier,
                actionId: action ? Number(action) : null,
              })),
            },
          },
          requirements: formData.requirements,
        },
        create: {
          name: formData.name,
          description: formData.description,
          modifiers: {
            createMany: {
              data: formData.modifiers.map(({ action, ...modifier }) => ({
                ...modifier,
                actionId: action ? Number(action) : null,
              })),
            },
          },
          requirements: formData.requirements,
        },
      });
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update perk');
    }
  },

  deletePerk: async (perkId: string) => {
    try {
      await prisma.perk.delete({
        where: {
          id: Number(perkId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete perk');
    }
  },
};

export default perkServices;
