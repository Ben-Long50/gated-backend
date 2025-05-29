import prisma from '../config/database.js';

export const enforceSingularLinking = async (
  parentId: number,
  itemIds?: number[],
  actionIds?: number[],
) => {
  const linkedItems = [] as string[];

  for (let id of itemIds || []) {
    const item = await prisma.item.findUnique({
      where: { id },
      select: {
        name: true,
        itemLink: {
          select: { item: { select: { id: true, name: true } } },
        },
      },
    });

    if (!item) {
      continue;
    }

    const parentItem = item.itemLink?.item;

    if (parentItem && parentItem.id !== parentId) {
      linkedItems.push(`${item.name} linked to ${parentItem.name}`);
    }
  }

  for (let id of actionIds || []) {
    const action = await prisma.action.findUnique({
      where: { id },
      select: {
        name: true,
        itemLink: {
          select: { item: { select: { id: true, name: true } } },
        },
      },
    });

    if (!action) {
      continue;
    }

    const parentItem = action.itemLink?.item;

    if (parentItem && parentItem.id !== parentId) {
      linkedItems.push(`${action.name} linked to ${parentItem.name}`);
    }
  }

  if (linkedItems.length > 0) {
    const items = linkedItems.join(', ');
    throw new Error(`Conflicting relationships exist: ${items}`);
  }
};
