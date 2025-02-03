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

      const newStats = {
        ...character?.stats,
        currentHealth: character?.stats.currentHealth + Number(value),
      };

      console.log(newStats);

      const characters = await prisma.character.update({
        where: {
          id: Number(characterId),
        },
        data: {
          stats: newStats,
        },
      });

      return characters;
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

      const newStats = {
        ...character?.stats,
        currentSanity: character?.stats.currentSanity + Number(value),
      };

      console.log(newStats);

      const characters = await prisma.character.update({
        where: {
          id: Number(characterId),
        },
        data: {
          stats: newStats,
        },
      });

      return characters;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update current sanity');
    }
  },
};

export default characterStatServices;
