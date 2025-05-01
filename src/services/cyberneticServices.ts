import prisma from '../config/database.js';
import { Cybernetic, CyberneticStats } from '../types/cybernetic.js';
import { CyberneticType } from '@prisma/client';
import { includeCyberneticLinkReference } from '../utils/linkQueryStructures.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';

const cyberneticServices = {
  getCybernetics: async () => {
    try {
      const cybernetics = await prisma.cybernetic.findMany({
        where: { characterInventoryId: null },
        include: {
          cyberneticLinkReference: {
            include: includeCyberneticLinkReference,
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
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
          cyberneticLinkReference: {
            include: includeCyberneticLinkReference,
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
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

      const {
        id,
        weaponLinkId,
        armorLinkId,
        cyberneticLinkId,
        weaponIds,
        armorIds,
        cyberneticIds,
        actionIds,
        modifiers,
        keywordIds,
        stats,
        cyberneticType,
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

      const newCybernetic = await prisma.cybernetic.upsert({
        where: { id },
        update: {
          ...data,
          cyberneticType: cyberneticType as CyberneticType,
          stats: {
            ...stats,
          },
          cyberneticLinkReference: {
            upsert: {
              where: { cyberneticId: id },
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
          cyberneticType: cyberneticType as CyberneticType,
          stats: {
            ...stats,
          },
          cyberneticLinkReference: {
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
          // modifiers: {
          //   createMany: {
          //     data: modifiers?.map(({ type, ...modifier }) => ({
          //       type: type.toLowerCase() as ModifierType,
          //       ...modifier,
          //     })),
          //   },
          // },
        },
      });

      return newCybernetic;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create cybernetic');
    }
  },

  createCharacterCyberneticCopy: async (
    inventoryId: string,
    cyberneticList: { cyberneticId: number; price: number; quantity: number }[],
  ) => {
    const cyberneticIds = cyberneticList?.map(
      (cybernetic) => cybernetic.cyberneticId,
    );

    const cybernetics = await prisma.cybernetic.findMany({
      where: { id: { in: cyberneticIds } },
      include: {
        cyberneticLinkReference: { include: includeCyberneticLinkReference },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { cyberneticId, quantity } of cyberneticList) {
      const cyberneticDetails = cybernetics.find(
        (cybernetic) => cybernetic.id === cyberneticId,
      );

      if (!cyberneticDetails) continue;

      let stats = {
        ...(cyberneticDetails.stats as CyberneticStats),
      };

      if (stats?.power && !stats?.currentPower) {
        stats = { ...stats, currentPower: stats.power };
      }

      const { weaponIds, armorIds, cyberneticIds, actionIds } =
        await createLinkedCopies(
          cyberneticDetails.cyberneticLinkReference,
          inventoryId,
          quantity,
        );

      const keywordIds =
        cyberneticDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = cyberneticDetails;

      const cyberneticData = {
        ...rest,
        stats,
        weaponIds,
        armorIds,
        cyberneticIds,
        actionIds,
        keywordIds,
        id: 0,
        characterInventoryId: Number(inventoryId),
        baseCyberneticId: cyberneticDetails.id,
      };

      if (cyberneticDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(
            cyberneticServices.createOrUpdateCybernetic(cyberneticData),
          );
        }
      }
    }

    const newCybernetics = await Promise.all(promises);

    return newCybernetics
      .filter((cybernetic) => cybernetic !== undefined)
      .map((cybernetic) => cybernetic.id);
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
