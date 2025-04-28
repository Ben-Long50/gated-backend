import prisma from '../config/database.js';
import actionServices from './actionServices.js';
import armorServices from './armorServices.js';
import weaponServices from './weaponServices.js';
import { WeaponStats } from '../types/weapon.js';
import { Cybernetic } from '../types/cybernetic.js';
import { ArmorStats } from '../types/armor.js';
import { Action } from '../types/action.js';

const cyberneticServices = {
  getCybernetics: async () => {
    try {
      const cybernetics = await prisma.cybernetic.findMany({
        where: { characterInventoryId: null },
        include: {
          weapons: {
            orderBy: { name: 'asc' },
            include: { keywords: { include: { keyword: true } } },
          },
          armor: {
            orderBy: { name: 'asc' },
            include: { keywords: { include: { keyword: true } } },
          },
          actions: { orderBy: { name: 'asc' } },
          modifiers: { include: { action: true } },
          keywords: { include: { keyword: true } },
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
          weapons: {
            orderBy: { name: 'asc' },
            include: { keywords: { include: { keyword: true } } },
          },
          armor: {
            orderBy: { name: 'asc' },
            include: { keywords: { include: { keyword: true } } },
          },
          actions: { orderBy: { name: 'asc' } },
          modifiers: { include: { action: true } },
          keywords: { include: { keyword: true } },
        },
      });

      if (!cybernetic) {
        throw new Error('Could not find cybernetic');
      }

      return cybernetic;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch cybernetic');
    }
  },

  createOrUpdateCybernetic: async (formData: Cybernetic) => {
    try {
      const cybernetic = await prisma.cybernetic.findUnique({
        where: { id: formData.id },
        include: {
          weapons: { select: { id: true } },
          armor: { select: { id: true } },
          actions: { select: { id: true } },
          modifiers: { select: { id: true } },
          keywords: { select: { id: true } },
        },
      });

      if (cybernetic && cybernetic.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: cybernetic.keywords.map((keyword) => keyword.id) },
          },
        });
      }
      const { weapons, armor, actions, modifiers, keywords, stats, ...data } =
        formData;

      if (cybernetic) {
        const oldModifierIds = cybernetic.modifiers.map(
          (modifier) => modifier.id,
        );
        await prisma.modifier.deleteMany({
          where: { id: { in: oldModifierIds } },
        });
      }

      const oldWeaponIds = cybernetic?.weapons?.map((id) => id.id);

      const newWeaponIds = weapons.map((weapon: { id: number }) => weapon.id);

      const weaponsToDelete =
        oldWeaponIds?.filter((id) => !newWeaponIds.includes(id)) || [];

      if (weaponsToDelete.length > 0) {
        await weaponServices.deleteWeapons(weaponsToDelete);
      }

      const oldArmorIds = cybernetic?.armor?.map((id) => id.id);

      const newArmorIds = armor.map((armor: { id: number }) => armor.id);

      const armorToDelete =
        oldArmorIds?.filter((id) => !newArmorIds.includes(id)) || [];

      if (armorToDelete.length > 0) {
        await armorServices.deleteArmors(armorToDelete);
      }

      const oldActionIds = cybernetic?.actions?.map((id) => id.id);

      const newActionIds = actions.map((action: Action) => action.id);

      const actionsToDelete =
        oldActionIds?.filter((id) => !newActionIds.includes(id)) || [];

      if (actionsToDelete.length > 0) {
        await actionServices.deleteActions(actionsToDelete);
      }

      const weaponIds = await Promise.all(
        weapons.map(
          async (weapon: {
            id?: number;
            name: string;
            stats: Partial<WeaponStats>;
            keywords: { keywordId: number; value?: number }[];
          }) => {
            const newWeapon = await weaponServices.createIntegratedWeapon(
              weapon,
              formData.picture,
              formData.rarity,
              formData.grade,
            );
            return { id: newWeapon.id };
          },
        ),
      );

      const armorIds = await Promise.all(
        armor.map(
          async (armor: {
            id?: number;
            name: string;
            stats: Partial<ArmorStats>;
            keywords: { keywordId: number; value?: number }[];
          }) => {
            const newArmor = await armorServices.createIntegratedArmor(
              armor,
              formData.picture,
              formData.rarity,
              formData.grade,
            );
            return { id: newArmor.id };
          },
        ),
      );

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

      const newCybernetic = await prisma.cybernetic.upsert({
        where: { id: formData.id || 0 },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          weapons: {
            connect: weaponIds,
          },
          armor: {
            connect: armorIds,
          },
          actions: {
            connect: actionIds,
          },
          keywords: { createMany: { data: keywordData } },
          modifiers: {
            createMany: {
              data: modifiers.map(({ action, ...modifier }) => ({
                ...modifier,
                actionId: action ? Number(action) : null,
              })),
            },
          },
        },
        create: {
          ...data,
          stats: {
            ...stats,
          },
          weapons: {
            connect: weaponIds,
          },
          armor: {
            connect: armorIds,
          },
          actions: {
            connect: actionIds,
          },
          keywords: { createMany: { data: keywordData } },
          modifiers: {
            createMany: {
              data: modifiers.map(({ action, ...modifier }) => ({
                ...modifier,
                actionId: action ? Number(action) : null,
              })),
            },
          },
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
