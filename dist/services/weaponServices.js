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
import { getGroupKeywords, getItemKeywords, } from '../utils/getAssociatedKeywords.js';
const weaponServices = {
    getWeapons: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const weapons = yield prisma.weapon.findMany({
                orderBy: { name: 'asc' },
            });
            const weaponDetails = yield getGroupKeywords(weapons);
            return weaponDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch weapons');
        }
    }),
    getWeaponById: (weaponId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const weapon = yield prisma.weapon.findUnique({
                where: {
                    id: Number(weaponId),
                },
            });
            if (!weapon) {
                throw new Error('Could not find weapon');
            }
            const weaponDetails = yield getItemKeywords(weapon);
            return weaponDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch weapon');
        }
    }),
    createIntegratedWeapon: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newWeapon = yield prisma.weapon.upsert({
                where: { name: formData.name },
                update: {
                    name: formData.name,
                    stats: formData.stats,
                    keywords: formData.keywords,
                },
                create: {
                    name: formData.name,
                    stats: formData.stats,
                    keywords: formData.keywords,
                },
            });
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update integrated weapon');
        }
    }),
    createWeapon: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return JSON.parse(formData.picture);
                }
            };
            const pictureInfo = getPictureInfo();
            const newWeapon = yield prisma.weapon.upsert({
                where: { id: Number(JSON.parse(formData.weaponId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: Number(JSON.parse(formData.price)),
                    description: JSON.parse(formData.description),
                    keywords: JSON.parse(formData.keywords),
                },
                create: {
                    name: JSON.parse(formData.name),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: JSON.parse(formData.price),
                    description: JSON.parse(formData.description),
                    keywords: JSON.parse(formData.keywords),
                },
            });
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update weapon');
        }
    }),
    deleteWeaponByName: (weaponName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.weapon.delete({
                where: {
                    name: weaponName,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete weapon');
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
            console.error(error);
            throw new Error('Failed to delete weapon');
        }
    }),
};
export default weaponServices;
