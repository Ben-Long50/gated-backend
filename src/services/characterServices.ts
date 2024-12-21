import prisma from '../config/database.js';

const characterServices = {
  getCharacters: async (userId) => {
    try {
      const characters = await prisma.character.findMany({
        where: {
          userId,
        },
        include: {
          characterPerk: {
            include: {
              perk: true,
            },
          },
        },
      });

      const characterList = characters.map((character) => ({
        ...character,
        perks: character.characterPerk.map((cp) => cp.perk),
      }));

      if (characterList.length === 0) {
        throw new Error('You have not created any characters');
      }

      return characterList;
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
          characterPerk: {
            include: {
              perk: true,
            },
          },
        },
      });

      const characterInfo = {
        ...character,
        perks: character.characterPerk.map((cp) => cp.perk),
      };

      return characterInfo;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch character');
    }
  },

  updateCharacter: async (formData, userId, characterId) => {
    try {
      const updatedCharacter = await prisma.character.update({
        where: {
          userId,
          id: Number(characterId),
        },
        data: {
          userId,
          name: JSON.parse(formData.name),
          level: Number(JSON.parse(formData.level)),
          profits: Number(JSON.parse(formData.profits)),
          stats: JSON.parse(formData.stats),
          picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
          height: Number(JSON.parse(formData.height)),
          weight: Number(JSON.parse(formData.weight)),
          age: Number(JSON.parse(formData.age)),
          sex: JSON.parse(formData.sex),
          background: JSON.parse(formData.background),
          attributes: JSON.parse(formData.attributes),
        },
      });

      const perks = JSON.parse(formData.perks);

      const currentPerks = await prisma.characterPerk.findMany({
        where: {
          characterId: Number(characterId),
        },
      });

      const currentPerkIds = currentPerks.map((perk) => perk.perkId);

      const perkPromises = perks
        .map((perkId) => {
          if (!currentPerkIds.includes(perkId)) {
            return prisma.characterPerk.create({
              data: {
                characterId: updatedCharacter.id,
                perkId,
              },
            });
          }
          return null;
        })
        .filter(Boolean);

      await Promise.all(perkPromises);

      return updatedCharacter;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to update character');
    }
  },
  createCharacter: async (formData, userId) => {
    try {
      const newCharacter = await prisma.character.create({
        data: {
          userId,
          name: JSON.parse(formData.name),
          stats: {
            currentHealth: 0,
            currentSanity: 0,
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
        },
      });

      const perks = JSON.parse(formData.perks);

      const perkPromises = perks.map((perkId) =>
        prisma.characterPerk.create({
          data: {
            characterId: newCharacter.id,
            perkId,
          },
        }),
      );

      await Promise.all(perkPromises);

      return newCharacter;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to create character');
    }
  },
};

export default characterServices;
