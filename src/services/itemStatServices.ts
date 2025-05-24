import prisma from '../config/database.js';
import getStatsObject from '../utils/getStatsObject.js';

const itemStatServices = {
  editItemAmmo: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a item your character owns',
        );
      }
      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      let newAmmoValue;

      if (
        statsObject.currentAmmoCount + Number(value) >
        statsObject.magCapacity
      ) {
        newAmmoValue = statsObject.magCapacity;
      } else if (statsObject.currentAmmoCount + Number(value) < 0) {
        newAmmoValue = 0;
      } else {
        newAmmoValue = statsObject.currentAmmoCount + Number(value);
      }

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentAmmoCount: newAmmoValue,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update item ammo');
    }
  },

  reloadItem: async (itemId: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a item your character owns',
        );
      }

      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      if (statsObject.currentMagCount === 0) {
        throw new Error('Not enough ammo available to reload');
      }

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentAmmoCount: statsObject.magCapacity,
              currentMagCount: statsObject.currentMagCount - 1,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to reload item ammo');
    }
  },

  refreshAmmo: async (itemId: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a item your character owns',
        );
      }

      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentAmmoCount: statsObject.magCapacity,
              currentMagCount: statsObject.magCount - 1,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update refresh item ammo');
    }
  },

  editItemPower: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }

      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      let newPowerValue;

      if (statsObject.currentPower + Number(value) > statsObject.power) {
        newPowerValue = statsObject.power;
      } else if (statsObject.currentPower + Number(value) < 0) {
        newPowerValue = 0;
      } else {
        newPowerValue = statsObject.currentPower + Number(value);
      }

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentPower: newPowerValue,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update item power');
    }
  },

  refreshItemPower: async (itemId: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }

      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentPower: statsObject.power,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to refresh item power');
    }
  },

  editItemBlock: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }

      if (!item) {
        throw new Error('Armor not found');
      }

      const statsObject = getStatsObject(item);

      let newBlockValue;

      if (statsObject.currentBlock + Number(value) > statsObject.block) {
        newBlockValue = statsObject.block;
      } else if (statsObject.currentBlock + Number(value) < 0) {
        newBlockValue = 0;
      } else {
        newBlockValue = statsObject.currentBlock + Number(value);
      }

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentBlock: newBlockValue,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update current block points');
    }
  },

  refreshItemBlock: async (itemId: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }

      if (!item) {
        throw new Error('Armor not found');
      }

      const statsObject = getStatsObject(item);

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentBlock: statsObject.block,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to refresh item block points');
    }
  },

  editItemHull: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a item your character owns',
        );
      }
      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      let newHullValue;

      if (statsObject.currentHull + Number(value) > statsObject.hull) {
        newHullValue = statsObject.hull;
      } else if (statsObject.currentHull + Number(value) < 0) {
        newHullValue = 0;
      } else {
        newHullValue = statsObject.currentHull + Number(value);
      }

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentHull: newHullValue,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update item hull');
    }
  },

  editItemCargo: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a item your character owns',
        );
      }
      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      let newCargoValue;

      if (statsObject.currentCargo + Number(value) > statsObject.cargo) {
        newCargoValue = statsObject.cargo;
      } else if (statsObject.currentCargo + Number(value) < 0) {
        newCargoValue = 0;
      } else {
        newCargoValue = statsObject.currentCargo + Number(value);
      }

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentCargo: newCargoValue,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update item cargo');
    }
  },

  editItemPass: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
          modifiedStats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== item?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a item your character owns',
        );
      }
      if (!item) {
        throw new Error('Item not found');
      }

      const statsObject = getStatsObject(item);

      let newPassValue;

      if (statsObject.currentPass + Number(value) > statsObject.pass) {
        newPassValue = statsObject.pass;
      } else if (statsObject.currentPass + Number(value) < 0) {
        newPassValue = 0;
      } else {
        newPassValue = statsObject.currentPass + Number(value);
      }

      const newStats =
        typeof item.stats === 'object'
          ? {
              ...item.stats,
              currentPass: newPassValue,
            }
          : {};

      await prisma.item.update({
        where: {
          id: Number(itemId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update item passengers');
    }
  },
};

export default itemStatServices;
