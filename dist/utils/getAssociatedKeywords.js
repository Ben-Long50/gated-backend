var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../config/database.js';
export const getGroupKeywords = (array) => __awaiter(void 0, void 0, void 0, function* () {
    const itemDetails = yield Promise.all(array.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        let weaponDetails = item.weapons;
        let armorDetails = item.armor;
        if (item.weapons) {
            weaponDetails = yield getGroupKeywords(item.weapons);
        }
        if (item.armor) {
            armorDetails = yield getGroupKeywords(item.armor);
        }
        const updatedItem = Object.assign(Object.assign({}, item), { weapons: weaponDetails, armor: armorDetails });
        if (updatedItem.keywords.length === 0)
            return updatedItem;
        const keywordIds = updatedItem.keywords.map((keyword) => keyword === null || keyword === void 0 ? void 0 : keyword.keywordId);
        const keywords = yield prisma.keyword.findMany({
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
    })));
    return itemDetails;
});
export const getItemKeywords = (item) => __awaiter(void 0, void 0, void 0, function* () {
    if (item.keywords.length === 0) {
        return item;
    }
    const keywordIds = item.keywords.map((keyword) => keyword === null || keyword === void 0 ? void 0 : keyword.keywordId);
    const keywords = yield prisma.keyword.findMany({
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
    console.log(keywordDetails);
    return Object.assign(Object.assign({}, item), { keywords: keywordDetails });
});
