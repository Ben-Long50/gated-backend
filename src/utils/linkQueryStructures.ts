import { Prisma } from '@prisma/client';

export const includeCharacterInventory: Prisma.CharacterInventoryInclude = {
  items: {
    select: { id: true, itemTypes: true },
  },
  actions: { orderBy: { name: 'asc' } },
};

export const includeCharacterCart: Prisma.CharacterCartInclude = {
  items: {
    include: {
      item: {
        include: {
          itemLinkReference: {
            include: {
              items: { orderBy: { name: 'asc' } },
              actions: { orderBy: { name: 'asc' } },
            },
          },
          characterInventory: {
            include: {
              character: { select: { firstName: true, lastName: true } },
            },
          },
        },
      },
    },
    orderBy: { item: { name: 'asc' } },
  },
};

export const equipLinked = {
  items: {
    updateMany: {
      where: {},
      data: {
        equipped: true,
      },
    },
  },
  actions: {
    updateMany: {
      where: { itemType: 'passive' },
      data: {
        equipped: true,
      },
    },
  },
};

export const unequipLinked = {
  items: {
    updateMany: {
      where: {},
      data: {
        equipped: false,
      },
    },
  },
  actions: {
    updateMany: {
      where: {},
      data: {
        active: false,
        equipped: false,
      },
    },
  },
};
