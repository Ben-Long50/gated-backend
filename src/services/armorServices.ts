import prisma from '../config/database.js';
import { Armor, ArmorStats } from '../types/armor.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { includeArmorLinkReference } from '../utils/linkQueryStructures.js';

const armorServices = {
  getArmor: async () => {
    try {
      const armor = await prisma.armor.findMany({
        where: { characterInventoryId: null },
        include: {
          armorLinkReference: { include: includeArmorLinkReference },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
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
        include: {
          armorLinkReference: { include: includeArmorLinkReference },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      if (!armor) {
        throw new Error('Could not find armor');
      }

      return armor;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch armor');
    }
  },

  createOrUpdateArmor: async (formData: Armor) => {
    try {
      const armor = await prisma.armor.findUnique({
        where: { id: formData.id },
        include: {
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
      const {
        id,
        weaponLinkId,
        armorLinkId,
        cyberneticLinkId,
        vehicleLinkId,
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
          (keyword: { keywordId: number; value: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newArmor = await prisma.armor.upsert({
        where: { id },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          armorLinkReference: {
            upsert: {
              where: { armorId: formData.id },
              update: {
                weapons: {
                  set: weaponIds?.map((id) => ({ id })),
                },
                armors: {
                  set: armorIds?.map((id) => ({ id })),
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
          armorLinkReference: {
            create: {
              weapons: {
                connect: weaponIds?.map((id) => ({ id })),
              },
              armors: {
                connect: armorIds?.map((id) => ({ id })),
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

      return newArmor;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create or update armor');
    }
  },

  createCharacterArmorCopy: async (
    inventoryId: string,
    armorList: { armorId: number; price: number | null; quantity: number }[],
  ) => {
    const armorIds = armorList?.map((armor) => armor.armorId);

    const armor = await prisma.armor.findMany({
      where: { id: { in: armorIds } },
      include: {
        armorLinkReference: { include: includeArmorLinkReference },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { armorId, quantity } of armorList) {
      const armorDetails = armor.find((armor) => armor.id === armorId);

      if (!armorDetails) continue;

      let stats = {
        ...(armorDetails.stats as ArmorStats),
      };

      if (stats?.block && !stats?.currentBlock) {
        stats = { ...stats, currentBlock: stats.block };
      }
      if (stats?.power && !stats?.currentPower) {
        stats = { ...stats, currentPower: stats.power };
      }

      const { weaponIds, armorIds, cyberneticIds, actionIds } =
        await createLinkedCopies(
          armorDetails.armorLinkReference,
          inventoryId,
          quantity,
        );

      const keywordIds =
        armorDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = armorDetails;

      const armorData = {
        ...rest,
        stats,
        weaponIds,
        armorIds,
        cyberneticIds,
        actionIds,
        keywordIds,
        id: 0,
        characterInventoryId: Number(inventoryId),
        baseArmorId: armorDetails.id,
      };

      if (armorDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(armorServices.createOrUpdateArmor(armorData));
        }
      }
    }

    const newArmor = await Promise.all(promises);

    return newArmor
      .filter((armor) => armor !== undefined)
      .map((armor) => armor.id);
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
