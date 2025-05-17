import prisma from '../config/database.js';

const cyberneticStatServices = {
  editCyberneticPower: async (
    cyberneticId: string,
    value: string,
    userId: number,
  ) => {
    try {
      const cybernetic = await prisma.item.findUnique({
        where: {
          id: Number(cyberneticId),
          itemType: 'augmentation',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== cybernetic?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a cybernetic your character owns',
        );
      }

      if (!cybernetic) {
        throw new Error('Cybernetic not found');
      }

      const statsObject = cybernetic.stats as Record<string, number>;

      let newPowerValue;

      if (statsObject.currentPower + Number(value) > statsObject.power) {
        newPowerValue = statsObject.power;
      } else if (statsObject.currentPower + Number(value) < 0) {
        newPowerValue = 0;
      } else {
        newPowerValue = statsObject.currentPower + Number(value);
      }

      const newStats = {
        ...statsObject,
        currentPower: newPowerValue,
      };

      await prisma.item.update({
        where: {
          id: Number(cyberneticId),
          itemType: 'augmentation',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update current power');
    }
  },

  refreshCyberneticPower: async (cyberneticId: string, userId: number) => {
    try {
      const cybernetic = await prisma.item.findUnique({
        where: {
          id: Number(cyberneticId),

          itemType: 'augmentation',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== cybernetic?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }

      if (!cybernetic) {
        throw new Error('Armor not found');
      }

      const statsObject = cybernetic.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentPower: statsObject.power,
      };

      await prisma.item.update({
        where: {
          id: Number(cyberneticId),
          itemType: 'augmentation',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to refresh cybernetic power');
    }
  },
};

export default cyberneticStatServices;
