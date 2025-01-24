import prisma from '../config/database.js';

const characterServices = {
  getCharacters: async (userId: number) => {
    try {
      const characters = await prisma.character.findMany({
        where: {
          userId,
        },
        include: {
          perks: true,
        },
        orderBy: [{ active: 'desc' }, { level: 'desc' }],
      });

      if (characters.length === 0) {
        throw new Error('You have not created any characters');
      }

      return characters;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch characters');
    }
  },

  getActiveCharacter: async (userId: number) => {
    try {
      const activeCharacter = await prisma.character.findFirst({
        where: {
          userId,
          active: true,
        },
        include: {
          perks: true,
          characterCart: {
            include: {
              weapons: true,
              armor: true,
              cybernetics: true,
              vehicles: true,
            },
          },
          CharacterInventory: {
            include: {
              weapons: true,
              armor: true,
              cybernetics: true,
              vehicles: true,
            },
          },
        },
      });

      return activeCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to find active character');
    }
  },

  getCharacterById: async (characterId: string) => {
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
      console.error(error);
      throw new Error('Failed to fetch character');
    }
  },

  setActiveCharacter: async (userId: number, characterId: string) => {
    try {
      console.log(characterId);

      await prisma.character.updateMany({
        where: { id: { not: Number(characterId) }, userId },
        data: { active: false },
      });
      const activeCharacter = await prisma.character.update({
        where: { id: Number(characterId), userId },
        data: { active: true },
      });

      return activeCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to switch active character');
    }
  },

  createCharacter: async (
    formData: {
      perks: string;
      stats: string;
      firstName: string;
      lastName: string;
      imageUrl: string;
      publicId: string;
      height: string;
      weight: string;
      age: string;
      sex: string;
      background: string;
      attributes: string;
    },
    userId: number,
  ) => {
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
            connect: perks.map((id: number) => ({ id })),
          },
        },
      });

      return newCharacter;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create character');
    }
  },

  createCharacterCart: async (characterId: number) => {
    try {
      await prisma.characterCart.create({
        data: {
          id: characterId,
          characterId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create character cart');
    }
  },

  addToCart: async (characterId: string, category: string, itemId: string) => {
    try {
      let itemCategory = '';

      switch (category) {
        case 'weapon':
          itemCategory = 'weapons';
          break;
        case 'armor':
          itemCategory = 'armor';
          break;
        case 'cybernetic':
          itemCategory = 'cybernetics';
          break;
        case 'vehicle':
          itemCategory = 'vehicles';
          break;
        default:
          throw new Error(`Invalid category: ${category}`);
      }

      const data = {
        [itemCategory]: { connect: { id: Number(itemId) } },
      };

      await prisma.characterCart.update({
        where: { id: Number(characterId) },
        data,
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to add item to cart');
    }
  },

  clearCart: async (characterId: string) => {
    try {
      await prisma.characterCart.update({
        where: { id: Number(characterId) },
        data: {
          weapons: {
            set: [],
          },
          armor: {
            set: [],
          },
          cybernetics: {
            set: [],
          },
          vehicles: {
            set: [],
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to clear cart');
    }
  },

  createCharacterInventory: async (characterId: number) => {
    try {
      await prisma.characterInventory.create({
        data: {
          id: characterId,
          characterId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create character inventory');
    }
  },

  updateCharacter: async (
    formData: {
      perks: string;
      stats: string;
      firstName: string;
      lastName: string;
      imageUrl: string;
      publicId: string;
      height: string;
      weight: string;
      age: string;
      sex: string;
      level: string;
      picture: string;
      profits: string;
      background: string;
      attributes: string;
    },
    userId: number,
    characterId: string,
  ) => {
    try {
      const newPerks = JSON.parse(formData.perks).map((id: number) => ({ id }));

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
        characterCartId: Number(characterId),
        characterInventoryId: Number(characterId),
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

  deleteCharacter: async (userId: number, characterId: string) => {
    try {
      await prisma.character.delete({
        where: {
          userId: userId,
          id: Number(characterId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete character');
    }
  },
};

export default characterServices;
