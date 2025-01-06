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
const armorServices = {
    getArmor: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const armor = yield prisma.armor.findMany({
                orderBy: { name: 'asc' },
            });
            const armorDetails = yield getGroupKeywords(armor);
            return armorDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    }),
    getArmorById: (armorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const armor = yield prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
            });
            if (!armor) {
                throw new Error('Could not find armor');
            }
            const armorDetails = yield getItemKeywords(armor);
            return armorDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    }),
    createIntegratedArmor: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newArmor = yield prisma.armor.upsert({
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
            return newArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update integrated armor');
        }
    }),
    createArmor: (formData) => __awaiter(void 0, void 0, void 0, function* () {
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
            const newArmor = yield prisma.armor.upsert({
                where: { id: Number(JSON.parse(formData.armorId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: JSON.parse(formData.price),
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
            return newArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update armor');
        }
    }),
    deleteArmorByName: (armorName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.armor.delete({
                where: {
                    name: armorName,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete armor');
        }
    }),
};
export default armorServices;
