import { Prisma } from '@prisma/client';

export const includeCharacterInventory: Prisma.CharacterInventoryInclude = {
  items: {
    include: {
      itemLinkReference: {
        include: {
          items: { orderBy: { name: 'asc' } },
          actions: { orderBy: { name: 'asc' } },
        },
      },
      keywords: { include: { keyword: true } },
    },
    orderBy: [{ name: 'asc' }, { grade: 'desc' }],
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
      where: {},
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
        equipped: false,
      },
    },
  },
};
