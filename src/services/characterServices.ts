import prisma from '../config/database.js';

const characterServices = {
  getCharacters: async (userId) => {
    try {
      const characters = await prisma.character.findMany({
        where: {
          userId,
        },
        include: {
          perks: true,
        },
        orderBy: { level: 'desc' },
      });

      if (characters.length === 0) {
        throw new Error('You have not created any characters');
      }

      return characters;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch characters');
    }
  },

  getCharacterById: async (characterId) => {
    try {
      const character = await prisma.character.findUnique({
        where: {
          id: Number(characterId),
        },
        include: {
          perks: true,
        },
      });

      return character;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch character');
    }
  },

  createCharacter: async (formData, userId) => {
    try {
      const perks = JSON.parse(formData.perks);
      const stats = JSON.parse(formData.stats);

      const newCharacter = await prisma.character.create({
        data: {
          userId,
          firstName: JSON.parse(formData.firstName),
          lastName: JSON.parse(formData.lastName),
          stats: {
            currentHealth: stats.currentHealth,
            currentSanity: stats.currentSanity,
            injuries: 0,
            insanities: 0,
          },
          picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
          height: Number(JSON.parse(formData.height)),
          weight: Number(JSON.parse(formData.weight)),
          age: Number(JSON.parse(formData.age)),
          sex: JSON.parse(formData.sex),
          background: JSON.parse(formData.background),
          attributes: JSON.parse(formData.attributes),
          perks: {
            connect: perks.map((id) => ({ id })),
          },
        },
      });

      return newCharacter;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to create character');
    }
  },

  updateCharacter: async (formData, userId, characterId) => {
    try {
      const newPerks = JSON.parse(formData.perks).map((id) => ({ id }));

      const oldPerks = await prisma.character
        .findUnique({
          where: {
            userId,
            id: Number(characterId),
          },
          select: {
            perks: { select: { id: true } },
          },
        })
        .then(
          (character) =>
            character?.perks.filter((perk) => !newPerks.includes(perk.id)) ||
            [],
        )
        .then((perks) => perks.map((perk) => ({ id: perk.id })));

      const data = {
        userId,
        firstName: JSON.parse(formData.firstName),
        lastName: JSON.parse(formData.lastName),
        level: Number(JSON.parse(formData.level)),
        profits: Number(JSON.parse(formData.profits)),
        stats: JSON.parse(formData.stats),
        ...(formData.picture && {
          picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
        }),
        height: Number(JSON.parse(formData.height)),
        weight: Number(JSON.parse(formData.weight)),
        age: Number(JSON.parse(formData.age)),
        sex: JSON.parse(formData.sex),
        background: JSON.parse(formData.background),
        attributes: JSON.parse(formData.attributes),
      };

      const updatedCharacter = await prisma.character.update({
        where: {
          userId,
          id: Number(characterId),
        },
        data: {
          ...data,
          perks: {
            disconnect: oldPerks,
            connect: newPerks,
          },
        },
      });

      return updatedCharacter;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to update character');
    }
  },

  deleteCharacter: async (userId, characterId) => {
    try {
      await prisma.character.delete({
        where: {
          userId: userId,
          id: Number(characterId),
        },
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete character');
    }
  },
};

export default characterServices;
