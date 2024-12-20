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

      return characters.map((character) => ({
        ...character,
        perks: character.characterPerk.map((cp) => cp.perk),
      }));
    } catch (error) {
      throw new Error('Failed to fetch characters');
    }
  },

  createCharacter: async (formData, userId) => {
    try {
      console.log(formData);

      const newCharacter = await prisma.character.create({
        data: {
          userId,
          name: formData.name,
          height: Number(formData.height),
          weight: Number(formData.weight),
          age: Number(formData.age),
          sex: formData.sex,
          background: formData.background,
          attributes: formData.attributes,
        },
      });
      console.log(newCharacter);

      await prisma.characterPerk.create({
        data: {
          characterId: newCharacter.id,
          perkId: formData.perks[0],
        },
      });

      return newCharacter;
    } catch (error) {
      throw new Error('Failed to create character');
    }
  },
};

export default characterServices;
