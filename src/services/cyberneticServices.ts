import prisma from '../config/database.js';
import {
  getGroupKeywords,
  getItemKeywords,
} from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
import armorServices from './armorServices.js';
import weaponServices from './weaponServices.js';

const cyberneticServices = {
  getCybernetics: async () => {
    try {
      const cybernetics = await prisma.cybernetic.findMany({
        include: {
          weapons: true,
          armor: true,
          actions: true,
        },
        orderBy: { name: 'asc' },
      });

      const cyberneticsDetails = await getGroupKeywords(cybernetics);

      return cyberneticsDetails;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cybernetics');
    }
  },

  getCyberneticById: async (cyberneticId) => {
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

  createCybernetic: async (formData) => {
    try {
      const cybernetic = await prisma.cybernetic.findUnique({
        where: { name: JSON.parse(formData.name) },
        include: {
          weapons: { select: { name: true } },
          armor: { select: { name: true } },
          actions: { select: { name: true } },
        },
      });

      const weaponsToDelete =
        cybernetic?.weapons.filter(
          (weapon) => !JSON.parse(formData.weapons).includes(weapon),
        ) || [];

      const armorToDelete =
        cybernetic?.armor.filter(
          (armor) => !JSON.parse(formData.armor).includes(armor),
        ) || [];

      const actionsToDelete =
        cybernetic?.actions.filter(
          (action) => !JSON.parse(formData.actions).includes(action),
        ) || [];

      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return JSON.parse(formData.picture);
        }
      };

      const pictureInfo = getPictureInfo();

      //Delete (from the database) integrated weapon pieces that have been removed via the submitted form
      await Promise.all(
        weaponsToDelete.map(async (weapon) => {
          await weaponServices.deleteWeaponByName(weapon.name);
        }),
      );

      //Delete (from the database) integrated armor pieces that have been removed via the submitted form
      await Promise.all(
        armorToDelete.map(async (armor) => {
          await armorServices.deleteArmorByName(armor.name);
        }),
      );

      //Delete (from the database) unqiue actions that have been removed via the submitted form
      await Promise.all(
        actionsToDelete.map(async (action) => {
          await actionServices.deleteActionByName(action.name);
        }),
      );

      const weaponIds = await Promise.all(
        JSON.parse(formData.weapons).map(async (weapon) => {
          const newWeapon = await weaponServices.createIntegratedWeapon(weapon);
          return { id: newWeapon.id };
        }),
      );

      const armorIds = await Promise.all(
        JSON.parse(formData.armor).map(async (armor) => {
          const newArmor = await armorServices.createIntegratedArmor(armor);
          return { id: newArmor.id };
        }),
      );

      const actionIds = await Promise.all(
        JSON.parse(formData.actions).map(async (action) => {
          const newAction = await actionServices.createAction(action);
          return { id: newAction.id };
        }),
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
        },
      });

      return newCybernetic;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create cybernetic');
    }
  },

  deleteCybernetic: async (cyberneticId) => {
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
