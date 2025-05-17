import prisma from '../config/database.js';

const weaponStatServices = {
  editWeaponAmmo: async (weaponId: string, value: string, userId: number) => {
    try {
      const weapon = await prisma.item.findUnique({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== weapon?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }
      if (!weapon) {
        throw new Error('Weapon not found');
      }

      const statsObject = weapon.stats as Record<string, number>;

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

      const newStats = {
        ...statsObject,
        currentAmmoCount: newAmmoValue,
      };

      await prisma.item.update({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update weapon ammo');
    }
  },

  reloadWeapon: async (weaponId: string, userId: number) => {
    try {
      const weapon = await prisma.item.findUnique({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== weapon?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }

      if (!weapon) {
        throw new Error('Weapon not found');
      }

      const statsObject = weapon.stats as Record<string, number>;

      if (statsObject.currentMagCount === 0) {
        throw new Error('Not enough ammo available to reload');
      }

      const newStats = {
        ...statsObject,
        currentAmmoCount: statsObject.magCapacity,
        currentMagCount: statsObject.currentMagCount - 1,
      };

      await prisma.item.update({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to reload weapon ammo');
    }
  },

  refreshAmmo: async (weaponId: string, userId: number) => {
    try {
      const weapon = await prisma.item.findUnique({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
        select: {
          stats: true,
          characterInventory: {
            include: { character: { select: { userId: true } } },
          },
        },
      });

      if (userId !== weapon?.characterInventory?.character?.userId) {
        throw new Error(
          'You can only perform this action on a weapon your character owns',
        );
      }

      if (!weapon) {
        throw new Error('Weapon not found');
      }

      const statsObject = weapon.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentAmmoCount: statsObject.magCapacity,
        currentMagCount: statsObject.magCount - 1,
      };

      await prisma.item.update({
        where: {
          id: Number(weaponId),
          itemType: 'weapon',
        },
        data: {
          stats: newStats,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update refresh weapon ammo');
    }
  },
};

export default weaponStatServices;
