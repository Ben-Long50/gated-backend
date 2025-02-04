import prisma from '../config/database.js';

const characterStatServices = {
  editCurrentHealth: async (characterId: string, value: string) => {
    try {
      const character = await prisma.character.findUnique({
        where: {
          id: Number(characterId),
        },
        select: { stats: true },
      });

      if (!character) {
        throw new Error('Character not found');
      }

      const statsObject = character.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentHealth: statsObject.currentHealth + Number(value),
      };

      console.log(newStats);

      await prisma.character.update({
        where: {
          id: Number(characterId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update current health');
    }
  },
  editCurrentSanity: async (characterId: string, value: string) => {
    try {
      const character = await prisma.character.findUnique({
        where: {
          id: Number(characterId),
        },
        select: { stats: true },
      });

      if (!character) {
        throw new Error('Character not found');
      }

      const statsObject = character.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentSanity: statsObject.currentSanity + Number(value),
      };

      await prisma.character.update({
        where: {
          id: Number(characterId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update current sanity');
    }
  },
};

export default characterStatServices;
