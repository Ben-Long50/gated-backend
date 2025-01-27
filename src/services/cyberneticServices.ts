import { ActionType } from '@prisma/client';
import prisma from '../config/database.js';
import {
  getGroupKeywords,
  getItemKeywords,
} from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
import armorServices from './armorServices.js';
import weaponServices from './weaponServices.js';
import { WeaponStats } from '../types/weapon.js';

const cyberneticServices = {
  getCybernetics: async () => {
    try {
      const cybernetics = await prisma.cybernetic.findMany({
        where: { characterInventoryId: null },
        include: {
          weapons: true,
          armor: true,
          actions: true,
        },
        orderBy: { name: 'asc' },
      });

      return cybernetics;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cybernetics');
    }
  },

  getCyberneticById: async (cyberneticId: string) => {
    try {
      const cybernetic = await prisma.cybernetic.findUnique({
        where: {
          id: Number(cyberneticId),
        },
        include: {
          weapons: true,
          armor: true,
          actions: true,
        },
      });

      if (!cybernetic) {
        throw new Error('Could not find cybernetic');
      }

      const weaponDetails = await getGroupKeywords(cybernetic?.weapons);
      const armorDetails = await getGroupKeywords(cybernetic?.armor);
      const cyberneticDetails = await getItemKeywords(cybernetic);

      return {
        ...cyberneticDetails,
        weapons: weaponDetails,
        armor: armorDetails,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cybernetic');
    }
  },

  createCybernetic: async (formData: {
    name: string;
    weapons: string;
    armor: string;
    actions: string;
    publicId: string;
    imageUrl: string;
    cyberneticId: string;
    cyberneticType: string;
    description: string;
    body: string;
    price: string;
    keywords: string;
    modifiers: string;
    stats: string;
    picture: string;
  }) => {
    try {
      const cybernetic = await prisma.cybernetic.findUnique({
        where: { id: Number(JSON.parse(formData.cyberneticId)) },
        include: {
          weapons: { select: { id: true } },
          armor: { select: { id: true } },
          actions: { select: { id: true } },
        },
      });

      console.log(cybernetic?.weapons, formData.weapons);

      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return JSON.parse(formData.picture);
        }
      };

      const pictureInfo = getPictureInfo();

      const weaponIds = await Promise.all(
        JSON.parse(formData.weapons).map(
          async (weapon: {
            id?: number;
            name: string;
            stats: Partial<WeaponStats>;
            keywords: { keywordId: number; value?: number }[];
          }) => {
            const newWeapon =
              await weaponServices.createIntegratedWeapon(weapon);
            return { id: newWeapon.id };
          },
        ),
      );

      const armorIds = await Promise.all(
        JSON.parse(formData.armor).map(
          async (armor: {
            name: string;
            stats: string;
            keywords: { keywordId: number; value?: number }[];
          }) => {
            const newArmor = await armorServices.createIntegratedArmor(armor);
            return { id: newArmor.id };
          },
        ),
      );

      const actionIds = await Promise.all(
        JSON.parse(formData.actions).map(
          async (action: {
            name: string;
            description: string;
            costs: string;
            attribute: string;
            skill: string;
            actionType: ActionType;
            actionSubtypes: string[];
            actionId: string;
          }) => {
            const newAction = await actionServices.createAction(action);
            return { id: newAction.id };
          },
        ),
      );

      const newCybernetic = await prisma.cybernetic.upsert({
        where: { id: Number(JSON.parse(formData.cyberneticId)) || 0 },
        update: {
          name: JSON.parse(formData.name),
          cyberneticType: JSON.parse(formData.cyberneticType),
          stats: JSON.parse(formData.stats),
          picture: pictureInfo,
          description: JSON.parse(formData.description),
          body: JSON.parse(formData.body),
          price: JSON.parse(formData.price),
          weapons: {
            connect: weaponIds,
          },
          armor: {
            connect: armorIds,
          },
          actions: {
            connect: actionIds,
          },
          keywords: JSON.parse(formData.keywords),
          modifiers: JSON.parse(formData.modifiers),
        },
        create: {
          name: JSON.parse(formData.name),
          cyberneticType: JSON.parse(formData.cyberneticType),
          stats: JSON.parse(formData.stats),
          picture: pictureInfo,
          description: JSON.parse(formData.description),
          body: JSON.parse(formData.body),
          price: JSON.parse(formData.price),
          weapons: {
            connect: weaponIds,
          },
          armor: {
            connect: armorIds,
          },
          actions: {
            connect: actionIds,
          },
          keywords: JSON.parse(formData.keywords),
          modifiers: JSON.parse(formData.modifiers),
        },
      });

      return newCybernetic;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create cybernetic');
    }
  },

  deleteCybernetic: async (cyberneticId: string) => {
    try {
      await prisma.cybernetic.delete({
        where: {
          id: Number(cyberneticId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete cybernetic');
    }
  },
};

export default cyberneticServices;
