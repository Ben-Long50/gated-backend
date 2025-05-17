import prisma from '../config/database.js';
import { Item, Stats } from '../types/item.js';
import addVariableStats from '../utils/addVariableStats.js';
import { enforceSingularLinking } from '../utils/enforceSingularLinking.js';
import { createLinkedCopies } from '../utils/createLinkedCopies.js';
import { ItemType } from '@prisma/client';
import weaponServices from './weaponServices.js';
import armorServices from './armorServices.js';
import cyberneticServices from './cyberneticServices.js';
import vehicleServices from './vehicleServices.js';
import droneServices from './droneServices.js';
import modificationServices from './modificationServices.js';

const itemServices = {
  getItems: async () => {
    try {
      const miscTypes = ['consumable', 'reusable'] as ItemType[];

      const items = await prisma.item.findMany({
        where: { itemType: { in: miscTypes }, characterInventory: null },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
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

  getItemById: async (itemId: string) => {
    try {
      const miscTypes = ['consumable', 'reusable'] as ItemType[];

      const item = await prisma.item.findUnique({
        where: { id: Number(itemId), itemType: { in: miscTypes } },
        include: {
          itemLinkReference: { include: { items: true, actions: true } },
          keywords: {
            include: { keyword: true },
            orderBy: { keyword: { name: 'asc' } },
          },
        },
      });

      return item;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch item');
    }
  },

  createOrUpdateItem: async (formData: Item) => {
    const miscTypes = ['consumable', 'reusable'] as ItemType[];

    try {
      const item = await prisma.item.findUnique({
        where: { id: formData.id ?? 0, itemType: { in: miscTypes } },
        include: {
          keywords: { select: { id: true } },
        },
      });

      if (item && item.keywords) {
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

      const newItem = await prisma.item.upsert({
        where: { id: id ?? 0, itemType: { in: miscTypes } },
        update: {
          ...data,
          stats: {
            ...stats,
          },
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
          itemType: 'reusable',
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
          characterInventory: characterInventoryId
            ? {
                connect: {
                  id: characterInventoryId,
                },
              }
            : undefined,
        },
      });

      return newItem;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create or update item');
    }
  },

  createCharacterItemCopy: async (
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
        characterInventoryId: Number(inventoryId),
        baseItemId: itemDetails.id,
      };

      if (itemDetails) {
        for (let i = 0; i < quantity; i++) {
          switch (itemData.itemType) {
            case 'weapon':
              promises.push(weaponServices.createOrUpdateWeapon(itemData));
              break;
            case 'armor':
              promises.push(armorServices.createOrUpdateArmor(itemData));
              break;
            case 'cybernetic':
              promises.push(
                cyberneticServices.createOrUpdateCybernetic(itemData),
              );
              break;
            case 'vehicle':
              promises.push(vehicleServices.createOrUpdateVehicle(itemData));
              break;
            case 'drone':
              promises.push(droneServices.createOrUpdateDrone(itemData));
              break;
            case 'modification':
              promises.push(
                modificationServices.createOrUpdateModification(itemData),
              );
              break;
            default:
              promises.push(itemServices.createOrUpdateItem(itemData));
              break;
          }
        }
      }
    }

    const newItems = await Promise.all(promises);

    return newItems.filter((item) => item !== undefined).map((item) => item.id);
  },

  deleteItem: async (itemId: string) => {
    try {
      const miscTypes = ['consumable', 'reusable'] as ItemType[];

      await prisma.item.delete({
        where: {
          id: Number(itemId),
          itemType: { in: miscTypes },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete item');
    }
  },

  deleteItems: async (itemIds: number[]) => {
    try {
      const miscTypes = ['consumable', 'reusable'] as ItemType[];

      await prisma.item.deleteMany({
        where: {
          id: { in: itemIds },
          itemType: { in: miscTypes },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete items');
    }
  },
};

export default itemServices;
