import prisma from '../config/database.js';

const cyberneticStatServices = {
  editCyberneticPower: async (cyberneticId: string, value: string) => {
    try {
      const cybernetic = await prisma.cybernetic.findUnique({
        where: {
          id: Number(cyberneticId),
        },
        select: { stats: true },
      });

      if (!cybernetic) {
        throw new Error('Armor not found');
      }

      const statsObject = cybernetic.stats as Record<string, number>;

      if (statsObject.currentPower + Number(value) < 0) {
        throw new Error('Not enough power available');
      }

      const newStats = {
        ...statsObject,
        currentPower: statsObject.currentPower + Number(value),
      };

      await prisma.cybernetic.update({
        where: {
          id: Number(cyberneticId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update current power');
    }
  },

  refreshCyberneticPower: async (cyberneticId: string) => {
    try {
      const cybernetic = await prisma.cybernetic.findUnique({
        where: {
          id: Number(cyberneticId),
        },
        select: { stats: true },
      });

      if (!cybernetic) {
        throw new Error('Armor not found');
      }

      const statsObject = cybernetic.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentPower: statsObject.power,
      };

      await prisma.cybernetic.update({
        where: {
          id: Number(cyberneticId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to refresh cybernetic power');
    }
  },
};

export default cyberneticStatServices;
