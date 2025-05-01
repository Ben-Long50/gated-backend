import prisma from '../config/database.js';

export const enforceSingularLinking = async (
  parentId: number,
  weaponIds?: number[],
  armorIds?: number[],
  cyberneticIds?: number[],
  actionIds?: number[],
  modificationIds?: number[],
) => {
  const linkedItems = [] as string[];

  for (let id of weaponIds || []) {
    const weapon = await prisma.weapon.findUnique({
      where: { id },
      select: {
        name: true,
        weaponLink: {
          select: { weapon: { select: { id: true, name: true } } },
        },
        armorLink: { select: { armor: { select: { id: true, name: true } } } },
        cyberneticLink: {
          select: { cybernetic: { select: { id: true, name: true } } },
        },
        vehicleLink: {
          select: { vehicle: { select: { id: true, name: true } } },
        },
      },
    });

    if (!weapon) {
      continue;
    }

    const linkedIds = [
      weapon?.weaponLink?.weapon,
      weapon?.armorLink?.armor,
      weapon?.cyberneticLink?.cybernetic,
      weapon?.vehicleLink?.vehicle,
    ].filter((id) => id);

    linkedIds.forEach((relation) => {
      if (relation && relation.id !== parentId) {
        linkedItems.push(`${weapon.name} linked to ${relation.name}`);
      }
    });
  }

  for (let id of armorIds || []) {
    const armor = await prisma.armor.findUnique({
      where: { id },
      select: {
        name: true,
        weaponLink: {
          select: { weapon: { select: { id: true, name: true } } },
        },
        armorLink: { select: { armor: { select: { id: true, name: true } } } },
        cyberneticLink: {
          select: { cybernetic: { select: { id: true, name: true } } },
        },
        vehicleLink: {
          select: { vehicle: { select: { id: true, name: true } } },
        },
      },
    });

    if (!armor) {
      continue;
    }

    const linkedIds = [
      armor?.weaponLink?.weapon,
      armor?.armorLink?.armor,
      armor?.cyberneticLink?.cybernetic,
      armor?.vehicleLink?.vehicle,
    ].filter((id) => id);

    linkedIds.forEach((relation) => {
      if (relation && relation.id !== parentId) {
        linkedItems.push(`${armor.name} linked to ${relation.name}`);
      }
    });
  }

  for (let id of cyberneticIds || []) {
    const cybernetic = await prisma.cybernetic.findUnique({
      where: { id },
      select: {
        name: true,
        weaponLink: {
          select: { weapon: { select: { id: true, name: true } } },
        },
        armorLink: { select: { armor: { select: { id: true, name: true } } } },
        cyberneticLink: {
          select: { cybernetic: { select: { id: true, name: true } } },
        },
      },
    });

    if (!cybernetic) {
      continue;
    }

    const linkedIds = [
      cybernetic?.weaponLink?.weapon,
      cybernetic?.armorLink?.armor,
      cybernetic?.cyberneticLink?.cybernetic,
    ].filter((id) => id);

    linkedIds.forEach((relation) => {
      if (relation && relation.id !== parentId) {
        linkedItems.push(`${cybernetic.name} linked to ${relation.name}`);
      }
    });
  }

  for (let id of actionIds || []) {
    const action = await prisma.action.findUnique({
      where: { id },
      select: {
        name: true,
        weaponLink: {
          select: { weapon: { select: { id: true, name: true } } },
        },
        armorLink: { select: { armor: { select: { id: true, name: true } } } },
        cyberneticLink: {
          select: { cybernetic: { select: { id: true, name: true } } },
        },
        vehicleLink: {
          select: { vehicle: { select: { id: true, name: true } } },
        },
        modificationLink: {
          select: { modification: { select: { id: true, name: true } } },
        },
      },
    });

    if (!action) {
      continue;
    }

    const linkedIds = [
      action?.weaponLink?.weapon,
      action?.armorLink?.armor,
      action?.cyberneticLink?.cybernetic,
      action?.vehicleLink?.vehicle,
      action?.modificationLink?.modification,
    ].filter((id) => id);

    linkedIds.forEach((relation) => {
      if (relation && relation.id !== parentId) {
        linkedItems.push(`${action.name} linked to ${relation.name}`);
      }
    });
  }

  for (let id of modificationIds || []) {
    const action = await prisma.modification.findUnique({
      where: { id },
      select: {
        name: true,
        vehicleLink: {
          select: { vehicle: { select: { id: true, name: true } } },
        },
      },
    });

    if (!action) {
      continue;
    }

    const linkedIds = [action?.vehicleLink?.vehicle].filter((id) => id);

    linkedIds.forEach((relation) => {
      if (relation && relation.id !== parentId) {
        linkedItems.push(`${action.name} linked to ${relation.name}`);
      }
    });
  }

  if (linkedItems.length > 0) {
    const items = linkedItems.join(', ');
    throw new Error(`Conflicting relationships exist: ${items}`);
  }
};
