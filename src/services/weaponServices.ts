import prisma from '../config/database.js';
import { Weapon, WeaponStats } from '../types/weapon.js';
import { includeWeaponLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';

const weaponServices = {
  getWeapons: async () => {
    try {
      const weapons = await prisma.weapon.findMany({
        where: {
          characterInventoryId: null,
          // weaponLinkId: null,
          armorLinkId: null,
          cyberneticLinkId: null,
          vehicleLinkId: null,
        },
        include: {
          weaponLinkReference: { include: includeWeaponLinkReference },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
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
        include: {
          weaponLinkReference: {
            include: includeWeaponLinkReference,
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      if (!weapon) {
        throw new Error('Could not find weapon');
      }

      return weapon;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch weapon');
    }
  },

  createOrUpdateWeapon: async (formData: Weapon) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: { id: formData.id ?? 0 },
        include: {
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

      const {
        id,
        weaponLinkId,
        armorLinkId,
        cyberneticLinkId,
        vehicleLinkId,
        droneLinkId,
        weaponIds,
        armorIds,
        cyberneticIds,
        actionIds,
        keywordIds,
        stats,
        characterInventoryId,
        ...data
      } = formData;

      await enforceSingularLinking(
        id,
        weaponIds,
        armorIds,
        cyberneticIds,
        actionIds,
        undefined,
      );

      const keywordData =
        keywordIds?.map(
          (keyword: { keywordId: number; value?: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newWeapon = await prisma.weapon.upsert({
        where: { id: id ?? 0 },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          weaponLinkReference: {
            upsert: {
              where: { weaponId: id ?? 0 },
              update: {
                weapons: {
                  set: weaponIds?.map((id) => ({ id })),
                },
                armors: {
                  set: armorIds?.map((id) => ({ id })),
                },
                cybernetics: {
                  set: cyberneticIds?.map((id) => ({ id })),
                },
                actions: {
                  set: actionIds?.map((id) => ({ id })),
                },
              },
              create: {
                weapons: {
                  connect: weaponIds?.map((id) => ({ id })),
                },
                armors: {
                  connect: armorIds?.map((id) => ({ id })),
                },
                cybernetics: {
                  connect: cyberneticIds?.map((id) => ({ id })),
                },
                actions: {
                  connect: actionIds?.map((id) => ({ id })),
                },
              },
            },
          },
          keywords: { createMany: { data: keywordData } },
          characterInventory: characterInventoryId
            ? {
                connect: {
                  id: characterInventoryId,
                },
              }
            : undefined,
        },
        create: {
          ...data,
          stats: {
            ...stats,
          },
          weaponLinkReference: {
            create: {
              weapons: {
                connect: weaponIds?.map((id) => ({ id })),
              },
              armors: {
                connect: armorIds?.map((id) => ({ id })),
              },
              cybernetics: {
                connect: cyberneticIds?.map((id) => ({ id })),
              },
              actions: {
                connect: actionIds?.map((id) => ({ id })),
              },
            },
          },
          keywords: { createMany: { data: keywordData } },
          characterInventory: characterInventoryId
            ? {
                connect: {
                  id: characterInventoryId,
                },
              }
            : undefined,
        },
      });

      return newWeapon;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create or update weapon');
    }
  },

  createCharacterWeaponCopy: async (
    inventoryId: number,
    weaponList: { weaponId: number; price: number | null; quantity: number }[],
  ) => {
    const weaponIds = weaponList?.map((weapon) => weapon.weaponId);

    const weapons = await prisma.weapon.findMany({
      where: { id: { in: weaponIds } },
      include: {
        weaponLinkReference: { include: includeWeaponLinkReference },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { weaponId, quantity } of weaponList) {
      const weaponDetails = weapons.find((weapon) => weapon.id === weaponId);

      if (!weaponDetails) continue;

      let stats = { ...(weaponDetails.stats as WeaponStats) };

      if (stats?.magCount && !stats?.currentMagCount) {
        stats = { ...stats, currentMagCount: stats.magCount - 1 };
      }
      if (stats?.magCapacity && !stats?.currentAmmoCount) {
        stats = { ...stats, currentAmmoCount: stats.magCapacity };
      }

      const { weaponIds, armorIds, cyberneticIds, actionIds } =
        await createLinkedCopies(
          weaponDetails.weaponLinkReference,
          inventoryId,
          quantity,
        );

      const keywordIds =
        weaponDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = weaponDetails;

      const weaponData = {
        ...rest,
        stats,
        weaponIds,
        armorIds,
        cyberneticIds,
        actionIds,
        keywordIds,
        id: 0,
        characterInventoryId: Number(inventoryId),
        baseWeaponId: weaponDetails.id,
      };

      if (weaponDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(weaponServices.createOrUpdateWeapon(weaponData));
        }
      }
    }

    const newWeapons = await Promise.all(promises);

    return newWeapons
      .filter((weapon) => weapon !== undefined)
      .map((weapon) => weapon.id);
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
