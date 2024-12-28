import prisma from '../config/database.js';

const weaponServices = {
  getWeapons: async () => {
    try {
      const weapons = await prisma.weapon.findMany({
        include: {
          keywords: true,
        },
        orderBy: { name: 'asc' },
      });

      return weapons;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weapons');
    }
  },

  getWeaponById: async (weaponId) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: {
          id: Number(weaponId),
        },
        include: {
          keywords: true,
        },
      });

      return weapon;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weapon');
    }
  },

  createWeapon: async (formData) => {
    try {
      const keywords = JSON.parse(formData.keywords).map((id: number) => ({
        id,
      }));

      const newWeapon = await prisma.weapon.create({
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

      return newWeapon;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to create weapon');
    }
  },

  updateWeapon: async (formData, weaponId) => {
    try {
      const newKeywords = JSON.parse(formData.keywords).map((id: number) => ({
        id,
      }));

      const oldKeywords = await prisma.weapon
        .findUnique({
          where: {
            id: Number(weaponId),
          },
          select: {
            keywords: { select: { id: true } },
          },
        })
        .then(
          (weapon) =>
            weapon?.keywords.filter(
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

      const updatedWeapon = await prisma.weapon.update({
        where: {
          id: Number(weaponId),
        },
        data: {
          ...data,
          perks: {
            disconnect: oldKeywords,
            connect: newKeywords,
          },
        },
      });

      return updatedWeapon;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to update weapon');
    }
  },

  deleteWeapon: async (weaponId) => {
    try {
      await prisma.weapon.delete({
        where: {
          id: Number(weaponId),
        },
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete weapon');
    }
  },
};

export default weaponServices;
