import prisma from '../config/database.js';
import { getItemKeywords } from '../utils/getAssociatedKeywords.js';
const armorServices = {
    getArmor: async () => {
        try {
            const armor = await prisma.armor.findMany({
                where: { characterInventoryId: null },
                orderBy: { name: 'asc' },
            });
            return armor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    },
    getArmorById: async (armorId) => {
        try {
            const armor = await prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
            });
            if (!armor) {
                throw new Error('Could not find armor');
            }
            const armorDetails = await getItemKeywords(armor);
            return armorDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch armor');
        }
    },
    createIntegratedArmor: async (formData, rarity, grade) => {
        try {
            const newArmor = await prisma.armor.upsert({
                where: { id: (formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    rarity,
                    grade,
                    stats: formData.stats,
                    keywords: formData.keywords,
                },
                create: {
                    name: formData.name,
                    rarity,
                    grade,
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
    },
    createArmor: async (formData) => {
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
            const newArmor = await prisma.armor.upsert({
                where: { id: Number(JSON.parse(formData.armorId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
                    rarity: JSON.parse(formData.rarity),
                    grade: Number(JSON.parse(formData.grade)),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: JSON.parse(formData.price),
                    description: JSON.parse(formData.description),
                    keywords: JSON.parse(formData.keywords),
                },
                create: {
                    name: JSON.parse(formData.name),
                    rarity: JSON.parse(formData.rarity),
                    grade: Number(JSON.parse(formData.grade)),
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
    },
    deleteArmor: async (armorId) => {
        try {
            await prisma.armor.delete({
                where: {
                    id: Number(armorId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete armor');
        }
    },
    deleteArmors: async (armorIds) => {
        try {
            await prisma.armor.deleteMany({
                where: {
                    id: { in: armorIds },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete armors');
        }
    },
};
export default armorServices;
