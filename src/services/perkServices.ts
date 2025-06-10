import prisma from '../config/database.js';
import { Stats } from '../types/item.js';

const perkServices = {
  getPerks: async () => {
    try {
      const perks = await prisma.perk.findMany({
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
    modifiers: Stats;
    attributes: object;
  }) => {
    try {
      const newUser = await prisma.perk.upsert({
        where: { id: Number(formData.perkId) || 0 },
        update: {
          name: formData.name,
          description: formData.description,
          modifiers: { ...formData.modifiers },
          attributes: formData.attributes,
        },
        create: {
          name: formData.name,
          description: formData.description,
          modifiers: { ...formData.modifiers },
          attributes: formData.attributes,
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
