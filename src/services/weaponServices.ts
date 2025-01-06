import prisma from '../config/database.js';
import {
  getGroupKeywords,
  getItemKeywords,
} from '../utils/getAssociatedKeywords.js';

const weaponServices = {
  getWeapons: async () => {
    try {
      const weapons = await prisma.weapon.findMany({
        orderBy: { name: 'asc' },
      });

      const weaponDetails = await getGroupKeywords(weapons);

      return weaponDetails;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapons');
    }
  },

  getWeaponById: async (weaponId) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: {
          id: Number(weaponId),
        },
      });

      const weaponDetails = await getItemKeywords(weapon);

      return weaponDetails;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapon');
    }
  },

  createIntegratedWeapon: async (formData) => {
    try {
      const newWeapon = await prisma.weapon.upsert({
        where: { name: formData.name },
        update: {
          name: formData.name,
          stats: formData.stats,
          keywords: formData.keywords,
        },
        create: {
          name: formData.name,
          stats: formData.stats,
          keywords: formData.keywords,
        },
      });

      return newWeapon;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update integrated weapon');
    }
  },

  createWeapon: async (formData) => {
    try {
      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return JSON.parse(formData.picture);
        }
      };

      const pictureInfo = getPictureInfo();

      const newWeapon = await prisma.weapon.upsert({
        where: { id: Number(JSON.parse(formData.weaponId)) || 0 },
        update: {
          name: JSON.parse(formData.name),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          keywords: JSON.parse(formData.keywords),
        },
        create: {
          name: JSON.parse(formData.name),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          keywords: JSON.parse(formData.keywords),
        },
      });

      return newWeapon;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update weapon');
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
      console.error(error);
      throw new Error('Failed to delete weapon');
    }
  },
};

export default weaponServices;
