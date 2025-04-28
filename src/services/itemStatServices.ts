import prisma from '../config/database.js';

const itemStatServices = {
  editItemPower: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
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

      const statsObject = item.stats as Record<string, number>;

      if (statsObject.currentPower + Number(value) < 0) {
        throw new Error('Not enough power available');
      }

      const newStats = {
        ...statsObject,
        currentPower: statsObject.currentPower + Number(value),
      };

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

      const statsObject = item.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentPower: statsObject.power,
      };

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

  editItemStacks: async (itemId: string, value: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
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

      const statsObject = item.stats as Record<string, number>;

      if (statsObject.currentStacks + Number(value) < 0) {
        throw new Error('Not enough stacks available');
      }

      const newStats = {
        ...statsObject,
        currentStacks: statsObject.currentStacks + Number(value),
      };

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
      throw new Error('Failed to update item stacks');
    }
  },

  refreshItemStacks: async (itemId: string, userId: number) => {
    try {
      const item = await prisma.item.findUnique({
        where: {
          id: Number(itemId),
        },
        select: {
          stats: true,
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

      const statsObject = item.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentStacks: statsObject.maxStacks,
      };

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
      throw new Error('Failed to refresh item stacks');
    }
  },
};

export default itemStatServices;
