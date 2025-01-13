import { Vehicle, Weapon } from '@prisma/client';
import prisma from '../config/database.js';
import { getGroupKeywords } from './getAssociatedKeywords.js';

export const getGroupWeapons = async (array: Vehicle[]) =>
  await Promise.all(
    array.map(async (item): Promise<Vehicle> => {
      if (item.weapons.length === 0) return item;

      const weaponIds: number[] = (
        item.weapons as { weaponId: number; quantity: number }[]
      ).map(
        (weapon: { weaponId: number; quantity: number }) => weapon?.weaponId,
      );

      const weapons = await prisma.weapon.findMany({
        where: {
          id: { in: weaponIds },
        },
      });

      const weaponsWithKeywords = await getGroupKeywords(weapons);

      const weaponDetails: { weapon: Weapon; quantity: number }[] =
        weaponsWithKeywords.map((weapon: Weapon) => {
          const origInfo = (
            item.weapons as { weaponId: number; quantity: number }[]
          ).find(
            (item: { weaponId: number; quantity: number }) =>
              weapon.id === item.weaponId,
          );
          if (origInfo) {
            return { weapon, quantity: origInfo.quantity };
          }
          return;
        });

      return { ...item, weapons: weaponDetails };
    }),
  );

export const getItemWeapons = async (item: Vehicle) => {
  if (item.weapons.length === 0) {
    return item;
  }

  const weaponIds = (
    item.weapons as { weaponId: number; quantity: number }[]
  ).map((weapon: { weaponId: number; quantity: number }) => weapon?.weaponId);

  const weapons = await prisma.weapon.findMany({
    where: {
      id: { in: weaponIds },
    },
  });

  const weaponsWithKeywords = await getGroupKeywords(weapons);

  const weaponDetails = weaponsWithKeywords.map((weapon: Weapon) => {
    const origInfo = (
      item.weapons as { weaponId: number; quantity: number }[]
    ).find(
      (item: { weaponId: number; quantity: number }) =>
        weapon.id === item.weaponId,
    );
    if (origInfo?.quantity) {
      return { weapon, quantity: origInfo.quantity };
    }
    return { weapon };
  });

  return { ...item, weapons: weaponDetails };
};
