import prisma from '../config/database.js';

const droneStatServices = {
  editDroneHull: async (droneId: string, value: string, userId: number) => {
    try {
      const drone = await prisma.drone.findUnique({
        where: {
          id: Number(droneId),
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== drone?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a drone your character owns',
        );
      }
      if (!drone) {
        throw new Error('Drone not found');
      }

      const statsObject = drone.stats as Record<string, number>;

      let newHullValue;

      if (statsObject.currentHull + Number(value) > statsObject.hull) {
        newHullValue = statsObject.hull;
      } else if (statsObject.currentHull + Number(value) < 0) {
        newHullValue = 0;
      } else {
        newHullValue = statsObject.currentHull + Number(value);
      }

      const newStats = {
        ...statsObject,
        currentHull: newHullValue,
      };

      await prisma.drone.update({
        where: {
          id: Number(droneId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update drone hull');
    }
  },

  editDronePower: async (droneId: string, value: string, userId: number) => {
    try {
      const drone = await prisma.drone.findUnique({
        where: {
          id: Number(droneId),
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== drone?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a drone your character owns',
        );
      }
      if (!drone) {
        throw new Error('Drone not found');
      }

      const statsObject = drone.stats as Record<string, number>;

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

      await prisma.drone.update({
        where: {
          id: Number(droneId),
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update drone power');
    }
  },
};

export default droneStatServices;
