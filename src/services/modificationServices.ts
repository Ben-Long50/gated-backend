import prisma from '../config/database.js';
import { Modification, ModificationStats } from '../types/modification.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';

const modificationServices = {
  getModifications: async () => {
    try {
      const modificiations = await prisma.modification.findMany({
        where: { characterInventoryId: null },
        include: {
          modificationLinkReference: {
            include: { actions: { orderBy: { name: 'asc' } } },
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return modificiations;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch modifications');
    }
  },

  getModificationById: async (modId: string) => {
    try {
      const modification = await prisma.modification.findUnique({
        where: {
          id: Number(modId),
        },
        include: {
          modificationLinkReference: {
            include: { actions: { orderBy: { name: 'asc' } } },
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      return modification;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch modification');
    }
  },

  createOrUpdateModification: async (formData: Modification) => {
    try {
      const modification = await prisma.modification.findUnique({
        where: { id: formData.id },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (modification && modification.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: modification.keywords.map((keyword) => keyword.id) },
          },
        });
      }

      const {
        id,
        vehicleLinkId,
        actionIds,
        keywordIds,
        stats,
        characterInventoryId,
        ...data
      } = formData;

      await enforceSingularLinking(
        id,
        undefined,
        undefined,
        undefined,
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

      const newModification = await prisma.modification.upsert({
        where: { id },
        update: {
          ...data,
          stats: {
            ...stats,
          },
          modificationLinkReference: {
            upsert: {
              where: { modificationId: id },
              update: {
                actions: {
                  set: actionIds?.map((id) => ({ id })),
                },
              },
              create: {
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
          modificationLinkReference: {
            create: {
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

      return newModification;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update modification');
    }
  },

  createCharacterModificationCopy: async (
    inventoryId: string,
    modificationList: {
      modificationId: number;
      price: number | null;
      quantity: number;
    }[],
  ) => {
    const modificationIds = modificationList?.map(
      (modification) => modification.modificationId,
    );

    const modifications = await prisma.modification.findMany({
      where: { id: { in: modificationIds } },
      include: {
        modificationLinkReference: { include: { actions: true } },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { modificationId, quantity } of modificationList) {
      const modificationDetails = modifications.find(
        (modification) => modification.id === modificationId,
      );

      if (!modificationDetails) continue;

      let stats = { ...(modificationDetails.stats as ModificationStats) };

      const { actionIds } = await createLinkedCopies(
        modificationDetails.modificationLinkReference,
        inventoryId,
        quantity,
      );

      const keywordIds =
        modificationDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = modificationDetails;

      const modificationData = {
        ...rest,
        stats,
        actionIds,
        keywordIds,
        id: 0,
        characterInventoryId: Number(inventoryId),
        baseModificationId: modificationDetails.id,
      };

      if (modificationDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(
            modificationServices.createOrUpdateModification(modificationData),
          );
        }
      }
    }

    const newModifications = await Promise.all(promises);

    return newModifications
      .filter((modification) => modification !== undefined)
      .map((modification) => modification.id);
  },

  deleteModification: async (modificationId: string) => {
    try {
      await prisma.modification.delete({
        where: {
          id: Number(modificationId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete modification');
    }
  },
};

export default modificationServices;
