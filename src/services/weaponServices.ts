import prisma from '../config/database.js';
import { WeaponStats } from '../types/weapon.js';
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

      return weapons;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapons');
    }
  },

  getWeaponsByKeyword: async (keywordNames: string[]) => {
    try {
      const keywordIds = await Promise.all(
        keywordNames.map((keywordName) =>
          prisma.keyword.findUnique({
            where: {
              name_keywordType: { name: keywordName, keywordType: 'weapon' },
            },
            select: { id: true },
          }),
        ),
      );

      const combinedIds = keywordIds.filter((keywordId) => keywordId !== null);

      if (combinedIds.length < 1) {
        throw new Error('The queried weapon keywords do not exist');
      }

      const weapons = await Promise.all(
        combinedIds.map((keyword) =>
          prisma.weapon.findMany({
            where: {
              keywords: {
                has: { keywordId: keyword.id },
              },
            },
            orderBy: { name: 'asc' },
          }),
        ),
      );

      const combinedWeapons = weapons.flat();

      const weaponDetails = await getGroupKeywords(combinedWeapons);

      return weaponDetails;
    } catch (error) {
      console.error(error);
      if (error) {
        throw error;
      }
      throw new Error('Failed to fetch weapons');
    }
  },

  getWeaponById: async (weaponId: string) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: {
          id: Number(weaponId),
        },
      });

      if (!weapon) {
        throw new Error('Could not find weapon');
      }

      const weaponDetails = await getItemKeywords(weapon);

      return weaponDetails;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapon');
    }
  },

  createIntegratedWeapon: async (formData: {
    name: string;
    stats: Partial<WeaponStats>;
    keywords: { keywordId: number; value?: number }[];
  }) => {
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

  createWeapon: async (formData: {
    publicId: string;
    imageUrl: string;
    picture: string;
    weaponId: string;
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

      const newWeapon = await prisma.weapon.upsert({
        where: { id: Number(JSON.parse(formData.weaponId)) || 0 },
        update: {
          name: JSON.parse(formData.name),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: Number(JSON.parse(formData.price)),
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

  deleteWeaponByName: async (weaponName: string) => {
    try {
      await prisma.weapon.delete({
        where: {
          name: weaponName,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete weapon');
    }
  },

  deleteWeapon: async (weaponId: string) => {
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
