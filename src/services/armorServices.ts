import prisma from '../config/database.js';
import {
  getGroupKeywords,
  getItemKeywords,
} from '../utils/getAssociatedKeywords.js';

const armorServices = {
  getArmor: async () => {
    try {
      const armor = await prisma.armor.findMany({
        orderBy: { name: 'asc' },
      });

      const armorDetails = await getGroupKeywords(armor);

      return armorDetails;
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
      });

      const armorDetails = await getItemKeywords(armor);

      return armorDetails;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch armor');
    }
  },

  createIntegratedArmor: async (formData) => {
    try {
      const newArmor = await prisma.armor.upsert({
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

      return newArmor;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to create or update integrated armor');
    }
  },

  createArmor: async (formData) => {
    try {
      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return JSON.parse(formData.picture);
        }
      };

      const pictureInfo = getPictureInfo();

      const newArmor = await prisma.armor.upsert({
        where: { id: Number(JSON.parse(formData.armorId)) || 0 },
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

      return newArmor;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to create or update armor');
    }
  },

  deleteArmorByName: async (armorName) => {
    try {
      await prisma.armor.delete({
        where: {
          name: armorName,
        },
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete armor');
    }
  },
};

export default armorServices;
