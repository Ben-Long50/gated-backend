import { $Enums } from '@prisma/client';
import prisma from '../config/database.js';
import { getItemKeywords } from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
import { Armor, ArmorStats } from '../types/armor.js';
import { Action } from '../types/action.js';

const armorServices = {
  getArmor: async () => {
    try {
      const armor = await prisma.armor.findMany({
        where: { characterInventoryId: null, cyberneticId: null },
        include: { actions: true, keywords: { include: { keyword: true } } },
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
        include: { actions: true, keywords: { include: { keyword: true } } },
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
      stats: Partial<ArmorStats>;
      keywords: { keywordId: number; value?: number }[];
    },
    picture: { publicId: string; imageUrl: string },
    rarity: $Enums.ItemRarity,
    grade: number,
  ) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: { id: formData.id },
        include: {
          actions: { select: { id: true } },
          keywords: { select: { id: true } },
        },
      });

      if (armor && armor.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: armor.keywords.map((keyword) => keyword.id) },
          },
        });
      }

      const { keywords, stats, ...data } = {
        ...formData,
        picture,
        rarity,
        grade,
      };

      const keywordData = keywords.map((keyword) => ({
        keywordId: keyword.keywordId,
        value: keyword.value,
      }));

      const newArmor = await prisma.armor.upsert({
        where: { id: formData?.id || 0 },
        update: {
          ...data,
          stats: { ...stats },
          keywords: { createMany: { data: keywordData } },
        },
        create: {
          ...data,
          stats: { ...stats },
          keywords: { createMany: { data: keywordData } },
        },
      });

      return newArmor;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update integrated armor');
    }
  },

  createOrUpdateArmor: async (formData: Armor) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: { id: formData.id },
        include: {
          actions: { select: { id: true } },
          keywords: { select: { id: true } },
        },
      });

      if (armor && armor.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: armor.keywords.map((keyword) => keyword.id) },
          },
        });
      }
      const { actions, keywords, stats, ...data } = formData;

      const oldActionIds = armor?.actions?.map((id) => id.id);

      const newActionIds = actions?.map((action: Action) => action.id) || [];

      const actionsToDelete =
        oldActionIds?.filter((id) => !newActionIds.includes(id)) || [];

      if (actionsToDelete.length > 0) {
        await actionServices.deleteActions(actionsToDelete);
      }

      const actionIds = actions
        ? await Promise.all(
            actions.map(async (action: Action) => {
              const newAction = await actionServices.createAction(action);
              return { id: newAction.id };
            }),
          )
        : [];

      const keywordData = keywords.map((keyword) => ({
        keywordId: keyword.keywordId,
        value: keyword.value,
      }));

      const newArmor = await prisma.armor.upsert({
        where: { id: data.id || 0 },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          actions: {
            connect: actionIds,
          },
          keywords: { createMany: { data: keywordData } },
        },
        create: {
          ...data,
          stats: {
            ...stats,
          },
          actions: {
            connect: actionIds,
          },
          keywords: { createMany: { data: keywordData } },
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
