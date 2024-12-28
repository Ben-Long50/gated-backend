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
const weaponServices = {
    getWeapons: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const weapons = yield prisma.weapon.findMany({
                include: {
                    keywords: true,
                },
                orderBy: { name: 'asc' },
            });
            return weapons;
        }
        catch (error) {
            throw new Error(error.message || 'Failed to fetch weapons');
        }
    }),
    getWeaponById: (weaponId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const weapon = yield prisma.weapon.findUnique({
                where: {
                    id: Number(weaponId),
                },
                include: {
                    keywords: true,
                },
            });
            return weapon;
        }
        catch (error) {
            throw new Error(error.message || 'Failed to fetch weapon');
        }
    }),
    createWeapon: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keywords = JSON.parse(formData.keywords).map((id) => ({
                id,
            }));
            const newWeapon = yield prisma.weapon.create({
                data: {
                    name: JSON.parse(formData.name),
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    stats: JSON.parse(formData.stats),
                    price: JSON.parse(formData.price),
                    description: JSON.parse(formData.description),
                    keywords: {
                        connect: keywords,
                    },
                },
            });
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create weapon');
        }
    }),
    updateWeapon: (formData, weaponId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newKeywords = JSON.parse(formData.keywords).map((id) => ({
                id,
            }));
            const oldKeywords = yield prisma.weapon
                .findUnique({
                where: {
                    id: Number(weaponId),
                },
                select: {
                    keywords: { select: { id: true } },
                },
            })
                .then((weapon) => (weapon === null || weapon === void 0 ? void 0 : weapon.keywords.filter((keyword) => !newKeywords.includes(keyword.id))) || [])
                .then((keywords) => keywords.map((keyword) => ({ id: keyword.id })));
            const data = Object.assign(Object.assign({ name: JSON.parse(formData.name) }, (formData.picture && {
                picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
            })), { stats: JSON.parse(formData.stats), price: JSON.parse(formData.price), description: JSON.parse(formData.description) });
            const updatedWeapon = yield prisma.weapon.update({
                where: {
                    id: Number(weaponId),
                },
                data: Object.assign(Object.assign({}, data), { perks: {
                        disconnect: oldKeywords,
                        connect: newKeywords,
                    } }),
            });
            return updatedWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update weapon');
        }
    }),
    deleteWeapon: (weaponId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.weapon.delete({
                where: {
                    id: Number(weaponId),
                },
            });
        }
        catch (error) {
            throw new Error(error.message || 'Failed to delete weapon');
        }
    }),
};
export default weaponServices;
