import prisma from '../config/database.js';

const perkServices = {
  getPerks: async () => {
    try {
      const perks = await prisma.perk.findMany({ orderBy: { name: 'asc' } });
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
    requirements: object;
  }) => {
    try {
      const newUser = await prisma.perk.upsert({
        where: { id: Number(formData.perkId) || 0 },
        update: {
          name: formData.name,
          description: formData.description,
          requirements: formData.requirements,
        },
        create: {
          name: formData.name,
          description: formData.description,
          requirements: formData.requirements,
        },
      });
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update perk');
    }
  },
};

export default perkServices;
