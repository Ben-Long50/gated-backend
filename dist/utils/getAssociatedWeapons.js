import prisma from '../config/database.js';
import { getGroupKeywords } from './getAssociatedKeywords.js';
export const getGroupWeapons = async (array) => await Promise.all(array.map(async (item) => {
    if (item.weapons.length === 0)
        return item;
    const weaponIds = item.weapons.map((weapon) => weapon === null || weapon === void 0 ? void 0 : weapon.weaponId);
    const weapons = await prisma.weapon.findMany({
        where: {
            id: { in: weaponIds },
        },
    });
    const weaponsWithKeywords = await getGroupKeywords(weapons);
    const weaponDetails = weaponsWithKeywords.map((weapon) => {
        const origInfo = item.weapons.find((item) => weapon.id === item.weaponId);
        if (origInfo) {
            return { weapon, quantity: origInfo.quantity };
        }
        return;
    });
    return Object.assign(Object.assign({}, item), { weapons: weaponDetails });
}));
export const getItemWeapons = async (item) => {
    if (item.weapons.length === 0) {
        return item;
    }
    const weaponIds = item.weapons.map((weapon) => weapon === null || weapon === void 0 ? void 0 : weapon.weaponId);
    const weapons = await prisma.weapon.findMany({
        where: {
            id: { in: weaponIds },
        },
    });
    const weaponsWithKeywords = await getGroupKeywords(weapons);
    const weaponDetails = weaponsWithKeywords.map((weapon) => {
        const origInfo = item.weapons.find((item) => weapon.id === item.weaponId);
        if (origInfo === null || origInfo === void 0 ? void 0 : origInfo.quantity) {
            return { weapon, quantity: origInfo.quantity };
        }
        return { weapon };
    });
    return Object.assign(Object.assign({}, item), { weapons: weaponDetails });
};
