import { Armor, Keyword, Weapon } from '@prisma/client';
import prisma from '../config/database.js';
import { Cybernetic } from '../types/cybernetic.js';

export const getGroupKeywords = async (
  array: Weapon[] | Armor[] | Cybernetic[],
) =>
  await Promise.all(
    array.map(async (item): Promise<Weapon | Armor | Cybernetic> => {
      const isCybernetic = (item: any): item is Cybernetic =>
        'weapons' in item || 'armor' in item;

      let weaponDetails, armorDetails;

      if (isCybernetic(item)) {
        if (item.weapons) {
          weaponDetails = await getGroupKeywords(item.weapons);
        }
        if (item.armor) {
          armorDetails = await getGroupKeywords(item.armor);
        }
      }

      const updatedItem = isCybernetic(item)
        ? {
            ...item,
            weapons: weaponDetails,
            armor: armorDetails,
          }
        : item;

      if (updatedItem.keywords.length === 0) return updatedItem;

      const keywordIds: number[] = updatedItem.keywords.map(
        (keyword: { keywordId: number; value?: number }) => keyword?.keywordId,
      );

      const keywords = await prisma.keyword.findMany({
        where: {
          id: { in: keywordIds },
        },
      });

      const keywordDetails: { keyword: Keyword; value?: number }[] =
        keywords.map((keyword) => {
          const origInfo = updatedItem.keywords.find(
            (item: { keywordId: number; value?: number }) =>
              keyword.id === item.keywordId,
          );
          if (origInfo?.value) {
            return { keyword, value: origInfo.value };
          }
          return { keyword };
        });

      return { ...updatedItem, keywords: keywordDetails };
    }),
  );

export const getItemKeywords = async (item: Cybernetic | Weapon | Armor) => {
  if (item.keywords.length === 0) {
    return item;
  }

  const keywordIds = item.keywords.map(
    (keyword: { keywordId: number; value?: number }) => keyword?.keywordId,
  );

  const keywords = await prisma.keyword.findMany({
    where: {
      id: { in: keywordIds },
    },
  });

  const keywordDetails = keywords.map((keyword) => {
    const origInfo = item.keywords.find(
      (item: { keywordId: number; value?: number }) =>
        keyword.id === item.keywordId,
    );
    if (origInfo?.value) {
      return { keyword, value: origInfo.value };
    }
    return { keyword };
  });
  console.log(keywordDetails);

  return { ...item, keywords: keywordDetails };
};
