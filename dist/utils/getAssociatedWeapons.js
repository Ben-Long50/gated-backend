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
import { getGroupKeywords } from './getAssociatedKeywords.js';
export const getGroupWeapons = (array) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Promise.all(array.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        if (item.weapons.length === 0)
            return item;
        const weaponIds = item.weapons.map((weapon) => weapon === null || weapon === void 0 ? void 0 : weapon.weaponId);
        const weapons = yield prisma.weapon.findMany({
            where: {
                id: { in: weaponIds },
            },
        });
        const weaponsWithKeywords = yield getGroupKeywords(weapons);
        const weaponDetails = weaponsWithKeywords.map((weapon) => {
            const origInfo = item.weapons.find((item) => weapon.id === item.weaponId);
            if (origInfo) {
                return { weapon, quantity: origInfo.quantity };
            }
            return;
        });
        return Object.assign(Object.assign({}, item), { weapons: weaponDetails });
    })));
});
export const getItemWeapons = (item) => __awaiter(void 0, void 0, void 0, function* () {
    if (item.weapons.length === 0) {
        return item;
    }
    const weaponIds = item.weapons.map((weapon) => weapon === null || weapon === void 0 ? void 0 : weapon.weaponId);
    const weapons = yield prisma.weapon.findMany({
        where: {
            id: { in: weaponIds },
        },
    });
    const weaponsWithKeywords = yield getGroupKeywords(weapons);
    const weaponDetails = weaponsWithKeywords.map((weapon) => {
        const origInfo = item.weapons.find((item) => weapon.id === item.weaponId);
        if (origInfo === null || origInfo === void 0 ? void 0 : origInfo.quantity) {
            return { weapon, quantity: origInfo.quantity };
        }
        return { weapon };
    });
    return Object.assign(Object.assign({}, item), { weapons: weaponDetails });
});
