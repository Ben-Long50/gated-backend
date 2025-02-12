import { $Enums, Action, ActionType } from '@prisma/client';
import prisma from '../config/database.js';
import { getItemKeywords } from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';

const armorServices = {
  getArmor: async () => {
    try {
      const armor = await prisma.armor.findMany({
        where: { characterInventoryId: null, cyberneticId: null },
        include: { actions: true },
        orderBy: { name: 'asc' },
      });

      return armor;
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
        include: { actions: true },
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

  createIntegratedArmor: async (
    formData: {
      id?: number;
      name: string;
      stats: string;
      keywords: { keywordId: number; value?: number }[];
    },
    picture: { publicId: string; imageUrl: string },
    rarity: $Enums.ItemRarity,
    grade: number,
  ) => {
    try {
      const newArmor = await prisma.armor.upsert({
        where: { id: formData?.id || 0 },
        update: {
          name: formData.name,
          picture,
          rarity,
          grade,
          stats: formData.stats,
          keywords: formData.keywords,
        },
        create: {
          name: formData.name,
          picture,
          rarity,
          grade,
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

  createOrUpdateArmor: async (formData: {
    publicId: string;
    imageUrl: string;
    picture: string;
    armorId: string;
    name: string;
    rarity: string;
    grade: string;
    stats: string;
    price: string;
    description: string;
    actions: string;
    keywords: string;
  }) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: { id: Number(JSON.parse(formData.armorId)) },
        include: {
          actions: { select: { id: true } },
        },
      });

      const oldActionIds = armor?.actions?.map((id) => id.id);

      const newActionIds = JSON.parse(formData.actions).map(
        (action: Action) => action.id,
      );

      const actionsToDelete =
        oldActionIds?.filter((id) => !newActionIds.includes(id)) || [];

      if (actionsToDelete.length > 0) {
        await actionServices.deleteActions(actionsToDelete);
      }

      const getPictureInfo = () => {
        if (formData.publicId) {
          return { publicId: formData.publicId, imageUrl: formData.imageUrl };
        } else {
          return JSON.parse(formData.picture);
        }
      };

      const pictureInfo = getPictureInfo();

      const actionIds = await Promise.all(
        JSON.parse(formData.actions).map(
          async (action: {
            name: string;
            description: string;
            costs: string;
            roll: string;
            duration: string;
            actionType: ActionType;
            actionSubtypes: string[];
            id?: string;
          }) => {
            const newAction = await actionServices.createAction(action);
            return { id: newAction.id };
          },
        ),
      );

      const newArmor = await prisma.armor.upsert({
        where: { id: Number(JSON.parse(formData.armorId)) || 0 },
        update: {
          name: JSON.parse(formData.name),
          rarity: JSON.parse(formData.rarity),
          grade: Number(JSON.parse(formData.grade)),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          actions: {
            connect: actionIds,
          },
          keywords: JSON.parse(formData.keywords),
        },
        create: {
          name: JSON.parse(formData.name),
          rarity: JSON.parse(formData.rarity),
          grade: Number(JSON.parse(formData.grade)),
          picture: pictureInfo,
          stats: JSON.parse(formData.stats),
          price: JSON.parse(formData.price),
          description: JSON.parse(formData.description),
          actions: {
            connect: actionIds,
          },
          keywords: JSON.parse(formData.keywords),
        },
      });

      return newArmor;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update armor');
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

  deleteArmors: async (armorIds: number[]) => {
    try {
      await prisma.armor.deleteMany({
        where: {
          id: { in: armorIds },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete armors');
    }
  },
};

export default armorServices;
