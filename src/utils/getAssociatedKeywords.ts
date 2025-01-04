import prisma from '../config/database.js';

export const getGroupKeywords = async (array) => {
  const itemDetails = await Promise.all(
    array.map(async (item) => {
      let weaponDetails = item.weapons;
      let armorDetails = item.armor;

      if (item.weapons) {
        weaponDetails = await getGroupKeywords(item.weapons);
      }
      if (item.armor) {
        armorDetails = await getGroupKeywords(item.armor);
      }

      const updatedItem = {
        ...item,
        weapons: weaponDetails,
        armor: armorDetails,
      };

      if (updatedItem.keywords.length === 0) return updatedItem;

      const keywordIds = updatedItem.keywords.map(
        (keyword) => keyword?.keywordId,
      );

      const keywords = await prisma.keyword.findMany({
        where: {
          id: { in: keywordIds },
        },
      });

      const keywordDetails = keywords.map((keyword) => {
        const origInfo = updatedItem.keywords.find(
          (item) => keyword.id === item.keywordId,
        );
        if (origInfo?.value) {
          return { keyword, value: origInfo.value };
        }
        return { keyword };
      });

      return { ...updatedItem, keywords: keywordDetails };
    }),
  );
  return itemDetails;
};

export const getItemKeywords = async (item) => {
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
      (item) => keyword.id === item.keywordId,
    );
    if (origInfo?.value) {
      return { keyword, value: origInfo.value };
    }
    return { keyword };
  });
  console.log(keywordDetails);

  return { ...item, keywords: keywordDetails };
};
