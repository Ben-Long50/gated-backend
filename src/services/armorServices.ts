import prisma from '../config/database.js';

const armorServices = {
  getArmor: async () => {
    try {
      const armor = await prisma.armor.findMany({
        include: {
          keywords: true,
        },
        orderBy: { name: 'asc' },
      });

      return armor;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch armor');
    }
  },

  getArmorById: async (armorId) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: {
          id: Number(armorId),
        },
        include: {
          keywords: true,
        },
      });

      return armor;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch armor');
    }
  },

  createArmor: async (formData) => {
    try {
      const keywords = JSON.parse(formData.keywords).map((id: number) => ({
        id,
      }));

      const newArmor = await prisma.armor.create({
        data: {
          name: JSON.parse(formData.name),
          picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          keywords: {
            connect: keywords,
          },
        },
      });

      return newArmor;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to create armor');
    }
  },

  updateArmor: async (formData, armorId) => {
    try {
      const newKeywords = JSON.parse(formData.keywords).map((id: number) => ({
        id,
      }));

      const oldKeywords = await prisma.armor
        .findUnique({
          where: {
            id: Number(armorId),
          },
          select: {
            keywords: { select: { id: true } },
          },
        })
        .then(
          (armor) =>
            armor?.keywords.filter(
              (keyword) => !newKeywords.includes(keyword.id),
            ) || [],
        )
        .then((keywords) => keywords.map((keyword) => ({ id: keyword.id })));

      const data = {
        name: JSON.parse(formData.name),
        ...(formData.picture && {
          picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
        }),
        stats: JSON.parse(formData.stats),
        price: JSON.parse(formData.price),
        description: JSON.parse(formData.description),
      };

      const updatedArmor = await prisma.armor.update({
        where: {
          id: Number(armorId),
        },
        data: {
          ...data,
          perks: {
            disconnect: oldKeywords,
            connect: newKeywords,
          },
        },
      });

      return updatedArmor;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to update armor');
    }
  },

  deleteArmor: async (armorId) => {
    try {
      await prisma.armor.delete({
        where: {
          id: Number(armorId),
        },
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete armor');
    }
  },
};

export default armorServices;
