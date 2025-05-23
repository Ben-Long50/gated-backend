import prisma from '../config/database.js';

const vehicleStatServices = {
  editVehicleHull: async (vehicleId: string, value: string, userId: number) => {
    try {
      const vehicle = await prisma.item.findUnique({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== vehicle?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a vehicle your character owns',
        );
      }
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      const statsObject = vehicle.stats as Record<string, number>;

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

      await prisma.item.update({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update vehicle hull');
    }
  },

  editVehicleCargo: async (
    vehicleId: string,
    value: string,
    userId: number,
  ) => {
    try {
      const vehicle = await prisma.item.findUnique({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== vehicle?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a vehicle your character owns',
        );
      }
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      const statsObject = vehicle.stats as Record<string, number>;

      let newCargoValue;

      if (statsObject.currentCargo + Number(value) > statsObject.cargo) {
        newCargoValue = statsObject.cargo;
      } else if (statsObject.currentCargo + Number(value) < 0) {
        newCargoValue = 0;
      } else {
        newCargoValue = statsObject.currentCargo + Number(value);
      }

      const newStats = {
        ...statsObject,
        currentCargo: newCargoValue,
      };

      await prisma.item.update({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update vehicle cargo');
    }
  },

  editVehiclePass: async (vehicleId: string, value: string, userId: number) => {
    try {
      const vehicle = await prisma.item.findUnique({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== vehicle?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a vehicle your character owns',
        );
      }
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      const statsObject = vehicle.stats as Record<string, number>;

      let newPassValue;

      if (statsObject.currentPass + Number(value) > statsObject.pass) {
        newPassValue = statsObject.pass;
      } else if (statsObject.currentPass + Number(value) < 0) {
        newPassValue = 0;
      } else {
        newPassValue = statsObject.currentPass + Number(value);
      }

      const newStats = {
        ...statsObject,
        currentPass: newPassValue,
      };

      await prisma.item.update({
        where: {
          id: Number(vehicleId),
          itemType: 'vehicle',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update vehicle passengers');
    }
  },
};

export default vehicleStatServices;
