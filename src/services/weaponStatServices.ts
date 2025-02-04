import prisma from '../config/database.js';

const weaponStatServices = {
  editWeaponAmmo: async (weaponId: string, value: string) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: {
          id: Number(weaponId),
        },
        select: { stats: true },
      });

      if (!weapon) {
        throw new Error('Weapon not found');
      }

      const statsObject = weapon.stats as Record<string, number>;

      if (statsObject.currentAmmoCount + Number(value) < 0) {
        throw new Error('Not enough ammo available to fire');
      }

      const newStats = {
        ...statsObject,
        currentAmmoCount: statsObject.currentAmmoCount + Number(value),
      };

      await prisma.weapon.update({
        where: {
          id: Number(weaponId),
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

  reloadWeapon: async (weaponId: string) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: {
          id: Number(weaponId),
        },
        select: { stats: true },
      });

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

      await prisma.weapon.update({
        where: {
          id: Number(weaponId),
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

  refreshAmmo: async (weaponId: string) => {
    try {
      const weapon = await prisma.weapon.findUnique({
        where: {
          id: Number(weaponId),
        },
        select: { stats: true },
      });

      if (!weapon) {
        throw new Error('Weapon not found');
      }

      const statsObject = weapon.stats as Record<string, number>;

      const newStats = {
        ...statsObject,
        currentAmmoCount: statsObject.magCapacity,
        currentMagCount: statsObject.magCount - 1,
      };

      await prisma.weapon.update({
        where: {
          id: Number(weaponId),
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
