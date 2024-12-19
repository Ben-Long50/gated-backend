import prisma from '../config/database.js';

const perkServices = {
  getPerks: async () => {
    try {
      const perks = await prisma.perk.findMany();
      return perks;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },

  createPerk: async (formData) => {
    try {
      const newUser = await prisma.perk.create({
        data: {
          name: formData.name,
          description: formData.description,
          requirements: formData.requirements,
        },
      });
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },
};

export default perkServices;
