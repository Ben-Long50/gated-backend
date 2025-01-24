import prisma from '../config/database.js';
export const getGroupKeywords = async (array) => await Promise.all(array.map(async (item) => {
    const isCybernetic = (item) => 'weapons' in item || 'armor' in item;
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
        ? Object.assign(Object.assign({}, item), { weapons: weaponDetails, armor: armorDetails }) : item;
    if (updatedItem.keywords.length === 0)
        return updatedItem;
    const keywordIds = updatedItem.keywords.map((keyword) => keyword === null || keyword === void 0 ? void 0 : keyword.keywordId);
    const keywords = await prisma.keyword.findMany({
        where: {
            id: { in: keywordIds },
        },
    });
    const keywordDetails = keywords.map((keyword) => {
        const origInfo = updatedItem.keywords.find((item) => keyword.id === item.keywordId);
        if (origInfo === null || origInfo === void 0 ? void 0 : origInfo.value) {
            return { keyword, value: origInfo.value };
        }
        return { keyword };
    });
    return Object.assign(Object.assign({}, updatedItem), { keywords: keywordDetails });
}));
export const getItemKeywords = async (item) => {
    if (item.keywords.length === 0) {
        return item;
    }
    const keywordIds = item.keywords.map((keyword) => keyword === null || keyword === void 0 ? void 0 : keyword.keywordId);
    const keywords = await prisma.keyword.findMany({
        where: {
            id: { in: keywordIds },
        },
    });
    const keywordDetails = keywords.map((keyword) => {
        const origInfo = item.keywords.find((item) => keyword.id === item.keywordId);
        if (origInfo === null || origInfo === void 0 ? void 0 : origInfo.value) {
            return { keyword, value: origInfo.value };
        }
        return { keyword };
    });
    return Object.assign(Object.assign({}, item), { keywords: keywordDetails });
};
