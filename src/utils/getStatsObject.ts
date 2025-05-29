import { Item } from '@prisma/client';

const getStatsObject = (item: Partial<Item>) => {
  if (!item.stats) {
    throw new Error('Armor not found');
  }

  const statsObject = Object.fromEntries(
    Object.entries(item.stats).map(([stat, value]) => {
      const modifiedValue =
        item.modifiedStats?.[stat as keyof typeof item.stats] ?? 0;
      return [stat, value + modifiedValue];
    }),
  );

  return statsObject;
};

export default getStatsObject;
