import prisma from '../config/database.js';

const armorStatServices = {
  editArmorPower: async (armorId: string, value: string) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: {
          id: Number(armorId),
        },
        select: { stats: true },
      });

      if (!armor) {
        throw new Error('Armor not found');
      }

      const statsObject = armor.stats as Record<string, number>;

      if (statsObject.currentPower + Number(value) < 0) {
        throw new Error('Not enough power available');
      }

      const newStats = {
        ...statsObject,
        currentPower: statsObject.currentPower + Number(value),
      };

      await prisma.armor.update({
        where: {
          id: Number(armorId),
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

  refreshArmorPower: async (armorId: string) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: {
          id: Number(armorId),
        },
        select: { stats: true },
      });

      if (!armor) {
        throw new Error('Armor not found');
      }

      const statsObject = armor.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentPower: statsObject.power,
      };

      await prisma.armor.update({
        where: {
          id: Number(armorId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to refresh armor power');
    }
  },

  editArmorBlock: async (armorId: string, value: string) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: {
          id: Number(armorId),
        },
        select: { stats: true },
      });

      if (!armor) {
        throw new Error('Armor not found');
      }

      const statsObject = armor.stats as Record<string, number>;

      if (statsObject.currentBlock + Number(value) < 0) {
        throw new Error('Not enough block points available');
      }

      const newStats = {
        ...statsObject,
        currentBlock: statsObject.currentBlock + Number(value),
      };

      await prisma.armor.update({
        where: {
          id: Number(armorId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update current block points');
    }
  },

  refreshArmorBlock: async (armorId: string) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: {
          id: Number(armorId),
        },
        select: { stats: true },
      });

      if (!armor) {
        throw new Error('Armor not found');
      }

      const statsObject = armor.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentBlock: statsObject.block,
      };

      await prisma.armor.update({
        where: {
          id: Number(armorId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to refresh armor block points');
    }
  },
};

export default armorStatServices;
