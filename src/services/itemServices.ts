import prisma from '../config/database.js';
import { Item, Stats } from '../types/item.js';
import addVariableStats from '../utils/addVariableStats.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { $Enums, Keyword } from '@prisma/client';
import actionServices from './actionServices.js';

const itemServices = {
  getItems: async (category?: $Enums.ItemType[]) => {
    let excludeAugments = false;

    if (category?.includes('weapon') || category?.includes('armor')) {
      excludeAugments = true;
    }

    try {
      const items = await prisma.item.findMany({
        where: category
          ? excludeAugments
            ? {
                characterInventory: null,
                itemLinkId: null,
                itemTypes: { hasEvery: category },
                NOT: {
                  itemTypes: {
                    has: 'augmentation',
                  },
                },
              }
            : {
                characterInventory: null,
                itemLinkId: null,
                itemTypes: { hasEvery: category },
              }
          : { characterInventory: null, itemLinkId: null },
        include: {
          baseItem: true,
          itemLinkReference: {
            include: {
              items: {
                include: {
                  keywords: {
                    include: { keyword: true },
                    orderBy: { keyword: { name: 'asc' } },
                  },
                  modifiedKeywords: {
                    include: { keyword: true },
                    orderBy: { keyword: { name: 'asc' } },
                  },
                  conditions: {
                    include: { condition: true },
                    orderBy: { condition: { name: 'asc' } },
                  },
                },
              },
              actions: {
                include: { keywordModifiers: { include: { keyword: true } } },
              },
            },
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
          modifiedKeywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
          conditions: {
            include: { condition: true },
            orderBy: { condition: { name: 'asc' } },
          },
        },
        orderBy: { name: 'asc' },
      });

      return items;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch items');
    }
  },

  getBatchItems: async (itemIds: number[]) => {
    try {
      const items = await prisma.item.findMany({
        where: { id: { in: itemIds } },
        include: {
          baseItem: true,
          itemLinkReference: {
            include: {
              items: {
                include: {
                  keywords: {
                    include: { keyword: true },
                    orderBy: { keyword: { name: 'asc' } },
                  },
                  modifiedKeywords: {
                    include: { keyword: true },
                    orderBy: { keyword: { name: 'asc' } },
                  },
                  conditions: {
                    include: { condition: true },
                    orderBy: { condition: { name: 'asc' } },
                  },
                },
              },
              actions: {
                include: {
                  keywordModifiers: { include: { keyword: true } },
                  itemLink: { select: { itemId: true } },
                },
              },
            },
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
          modifiedKeywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
          conditions: {
            include: { condition: true },
            orderBy: { condition: { name: 'asc' } },
          },
        },
      });

      return items;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch item');
    }
  },

  getItemById: async (itemId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: { id: itemId },
        include: {
          baseItem: true,
          itemLinkReference: {
            include: {
              items: {
                include: {
                  keywords: {
                    include: { keyword: true },
                    orderBy: { keyword: { name: 'asc' } },
                  },
                  modifiedKeywords: {
                    include: { keyword: true },
                    orderBy: { keyword: { name: 'asc' } },
                  },
                  conditions: {
                    include: { condition: true },
                    orderBy: { condition: { name: 'asc' } },
                  },
                },
              },
              actions: {
                include: {
                  keywordModifiers: { include: { keyword: true } },
                  itemLink: { select: { itemId: true } },
                },
              },
            },
          },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
          modifiedKeywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
          conditions: {
            include: { condition: true },
            orderBy: { condition: { name: 'asc' } },
          },
        },
      });

      return item;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch item');
    }
  },

  createOrUpdateItem: async (formData: Item, category: $Enums.ItemType[]) => {
    try {
      const item = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemTypes: { hasEvery: category } },
        include: {
          keywords: { select: { id: true } },
          modifiedKeywords: { select: { id: true } },
        },
      });

      if (item && item.keywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: item.keywords.map((keyword) => keyword.id) },
          },
        });
      }

      if (item && item.modifiedKeywords) {
        await prisma.keywordReference.deleteMany({
          where: {
            id: { in: item.keywords.map((keyword) => keyword.id) },
          },
        });
      }

      const {
        id,
        itemLinkId,
        itemIds,
        actionIds,
        keywordIds,
        modifiedKeywordIds,
        stats,
        characterInventoryId,
        ...data
      } = formData;

      await enforceSingularLinking(id, itemIds, actionIds);

      const keywordData =
        keywordIds?.map(
          (keyword: { keywordId: number; value?: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const modifiedKeywordData =
        modifiedKeywordIds?.map(
          (keyword: { keywordId: number; value?: number | null }) => ({
            keywordId: keyword.keywordId,
            value: keyword.value,
          }),
        ) || [];

      const newItem = await prisma.item.upsert({
        where: { id: id ?? 0 },
        update: {
          ...data,
          ...(stats ? { stats } : {}),
          updatedAt: new Date(),
          itemLinkReference: {
            upsert: {
              where: { itemId: id ?? 0 },
              update: {
                items: {
                  set: itemIds?.map((id) => ({ id })),
                },
                actions: {
                  set: actionIds?.map((id) => ({ id })),
                },
              },
              create: {
                items: {
                  connect: itemIds?.map((id) => ({ id })),
                },
                actions: {
                  connect: actionIds?.map((id) => ({ id })),
                },
              },
            },
          },
          keywords: { createMany: { data: keywordData } },
          modifiedKeywords: { createMany: { data: modifiedKeywordData } },
          characterInventoryId,
        },
        create: {
          ...data,
          ...(stats ? { stats } : {}),
          itemLinkReference: {
            create: {
              items: {
                connect: itemIds?.map((id) => ({ id })),
              },
              actions: {
                connect: actionIds?.map((id) => ({ id })),
              },
            },
          },
          keywords: { createMany: { data: keywordData } },
          modifiedKeywords: { createMany: { data: modifiedKeywordData } },
          characterInventoryId,
        },
      });

      return newItem;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update item');
    }
  },

  createItemCopy: async (itemId: number, category: $Enums.ItemType[]) => {
    try {
      const itemDetails = await prisma.item.findUnique({
        where: { id: itemId, itemTypes: { hasEvery: category } },
        include: {
          keywords: { include: { keyword: true } },
          itemLinkReference: { include: { items: true, actions: true } },
        },
      });

      if (!itemDetails) {
        throw new Error('Failed to find original item');
      }

      const {
        id,
        baseItemId,
        itemLinkId,
        stats,
        modifiedStats,
        picture,
        keywords,
        //@ts-ignore
        modifiedKeywords,
        itemLinkReference,
        ...data
      } = itemDetails;

      const keywordData =
        keywords?.map(
          (keyword: { keyword: Keyword; value?: number | null }) => ({
            keywordId: keyword.keyword.id,
            value: keyword.value,
          }),
        ) || [];

      const modifiedKeywordData =
        modifiedKeywords?.map(
          (keyword: { keyword: Keyword; value?: number | null }) => ({
            keywordId: keyword.keyword.id,
            value: keyword.value,
          }),
        ) || [];

      const itemIds = [] as number[];
      const actionIds = [] as number[];

      if (itemLinkReference?.items) {
        for (let item of itemLinkReference?.items) {
          const newItem = await itemServices.createItemCopy(
            item.id,
            item.itemTypes,
          );

          itemIds.push(newItem.id);
        }
      }

      if (itemLinkReference?.actions) {
        for (let action of itemLinkReference?.actions) {
          const newItem = await actionServices.createActionCopy(action.id);

          actionIds.push(newItem.id);
        }
      }

      const itemCopy = await prisma.item.create({
        data: {
          ...data,
          ...(stats ? { stats } : {}),
          ...(picture ? { picture } : {}),
          ...(modifiedStats ? { modifiedStats } : {}),
          itemLinkReference: {
            create: {
              items: {
                connect: itemIds.map((id) => ({ id })),
              },

              actions: {
                connect: actionIds.map((id) => ({ id })),
              },
            },
          },
          keywords: { createMany: { data: keywordData } },
          modifiedKeywords: { createMany: { data: modifiedKeywordData } },
          baseItemId: id,
        },
      });

      return itemCopy;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create item copy');
    }
  },

  createCharacterItemCopy: async (
    userId: number,
    inventoryId: number,
    itemList: { itemId: number; price: number | null; quantity: number }[],
  ) => {
    const itemIds = itemList?.map((item) => item.itemId);

    const items = await prisma.item.findMany({
      where: { id: { in: itemIds } },
      include: {
        itemLinkReference: { include: { items: true, actions: true } },
        keywords: { include: { keyword: true } },
      },
    });

    const promises = [];

    for (const { itemId, quantity } of itemList) {
      const itemDetails = items.find((item) => item.id === itemId);

      if (!itemDetails) continue;

      const stats = itemDetails.stats
        ? addVariableStats({ ...(itemDetails.stats as Stats) })
        : null;

      const { itemIds, actionIds } = await createLinkedCopies(
        userId,
        itemDetails.itemLinkReference,
        inventoryId,
        quantity,
      );

      const keywordIds =
        itemDetails?.keywords.map((keyword) => ({
          keywordId: keyword.keywordId,
          value: keyword.value,
        })) || [];

      const { keywords, ...rest } = itemDetails;

      const itemData = {
        ...rest,
        stats,
        itemIds,
        actionIds,
        keywordIds,
        id: 0,
        characterInventoryId: inventoryId,
        baseItemId: itemDetails.id,
        userId,
      };

      if (itemDetails) {
        for (let i = 0; i < quantity; i++) {
          promises.push(
            itemServices.createOrUpdateItem(itemData, itemData.itemTypes),
          );
        }
      }
    }

    const newItems = await Promise.all(promises);

    return newItems.filter((item) => item !== undefined).map((item) => item.id);
  },

  createItemConditions: async (
    itemId: number,
    formData: { conditionId: number; stacks?: number | null }[],
  ) => {
    try {
      const item = await prisma.item.findUnique({
        where: { id: itemId },
        include: {
          conditions: { select: { id: true } },
        },
      });

      if (!item) {
        throw new Error('Failed to find character');
      }

      if (item && item.conditions) {
        await prisma.itemConditionReference.deleteMany({
          where: {
            id: { in: item.conditions.map((condition) => condition.id) },
          },
        });
      }

      const conditionData =
        formData?.map((condition) => ({
          conditionId: condition.conditionId,
          stacks: condition.stacks ? condition.stacks : null,
        })) || [];

      await prisma.item.update({
        where: {
          id: itemId,
        },
        data: {
          conditions: { createMany: { data: conditionData } },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create item conditions');
    }
  },

  deleteItem: async (itemId: number) => {
    try {
      await prisma.item.delete({
        where: {
          id: Number(itemId),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete item');
    }
  },

  deleteItems: async (itemIds: number[], category?: $Enums.ItemType[]) => {
    try {
      await prisma.item.deleteMany({
        where: category
          ? {
              id: { in: itemIds },
              itemTypes: { hasSome: category },
            }
          : {
              itemTypes: { hasSome: category },
            },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete items');
    }
  },
};

export default itemServices;
