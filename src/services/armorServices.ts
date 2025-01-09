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
      console.error(error);
      throw new Error('Failed to fetch armor');
    }
  },

  getArmorById: async (armorId: string) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: {
          id: Number(armorId),
        },
      });

      if (!armor) {
        throw new Error('Could not find armor');
      }

      const armorDetails = await getItemKeywords(armor);

      return armorDetails;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch armor');
    }
  },

  createIntegratedArmor: async (formData: {
    name: string;
    stats: string;
    keywords: { keywordId: number; value?: number }[];
  }) => {
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

  createArmor: async (formData: {
    publicId: string;
    imageUrl: string;
    picture: string;
    armorId: string;
    name: string;
    stats: string;
    price: string;
    description: string;
    keywords: string;
  }) => {
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

  deleteArmorByName: async (armorName: string) => {
    try {
      await prisma.armor.delete({
        where: {
          name: armorName,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete armor');
    }
  },

  deleteArmor: async (armorId: string) => {
    try {
      await prisma.armor.delete({
        where: {
          id: Number(armorId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete armor');
    }
  },
};

export default armorServices;
