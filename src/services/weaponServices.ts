import { $Enums } from '@prisma/client';
import prisma from '../config/database.js';
import { Weapon, WeaponStats } from '../types/weapon.js';
import { getItemKeywords } from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
import { Action } from '../types/action.js';

const weaponServices = {
  getWeapons: async () => {
    try {
      const weapons = await prisma.weapon.findMany({
        where: {
          characterInventoryId: null,
          vehicleId: null,
          cyberneticId: null,
        },
        include: { actions: true, keywords: { include: { keyword: true } } },
        orderBy: { name: 'asc' },
      });

      return weapons;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapons');
    }
  },

  getWeaponById: async (weaponId: string) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: {
          id: Number(weaponId),
        },
        include: { actions: true, keywords: { include: { keyword: true } } },
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

  createIntegratedWeapon: async (
    formData: {
      id?: number;
      name: string;
      stats: Partial<WeaponStats>;
      keywords: { keywordId: number; value?: number }[];
    },
    picture: { publicId: string; imageUrl: string },
    rarity: $Enums.ItemRarity,
    grade: number,
  ) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: { id: formData.id },
        include: {
          actions: { select: { id: true } },
          keywords: { select: { id: true } },
        },
      });

      if (weapon && weapon.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: weapon.keywords.map((keyword) => keyword.id) },
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

      const newWeapon = await prisma.weapon.upsert({
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

      return newWeapon;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update integrated weapon');
    }
  },

  createOrUpdateWeapon: async (formData: Weapon) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: { id: formData.id },
        include: {
          actions: { select: { id: true } },
          keywords: { select: { id: true } },
        },
      });

      if (weapon && weapon.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: weapon.keywords.map((keyword) => keyword.id) },
          },
        });
      }
      const { actions, keywords, stats, ...data } = formData;

      const oldActionIds = weapon?.actions?.map((id) => id.id);

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

      const newWeapon = await prisma.weapon.upsert({
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

      return newWeapon;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update weapon');
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

  deleteWeapons: async (weaponIds: number[]) => {
    try {
      await prisma.weapon.deleteMany({
        where: {
          id: { in: weaponIds },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete weapons');
    }
  },
};

export default weaponServices;
