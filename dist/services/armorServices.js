import prisma from '../config/database.js';
import { getItemKeywords } from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
const armorServices = {
    getArmor: async () => {
        try {
            const armor = await prisma.armor.findMany({
                where: { characterInventoryId: null, cyberneticId: null },
                include: { actions: true },
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
                include: { actions: true },
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
    createIntegratedArmor: async (formData, picture, rarity, grade) => {
        try {
            const newArmor = await prisma.armor.upsert({
                where: { id: (formData === null || formData === void 0 ? void 0 : formData.id) || 0 },
                update: {
                    name: formData.name,
                    picture,
                    rarity,
                    grade,
                    stats: formData.stats,
                    keywords: formData.keywords,
                },
                create: {
                    name: formData.name,
                    picture,
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
        var _a;
        try {
            const armor = await prisma.armor.findUnique({
                where: { id: Number(JSON.parse(formData.armorId)) },
                include: {
                    actions: { select: { id: true } },
                },
            });
            const oldActionIds = (_a = armor === null || armor === void 0 ? void 0 : armor.actions) === null || _a === void 0 ? void 0 : _a.map((id) => id.id);
            const newActionIds = JSON.parse(formData.actions).map((action) => action.id);
            const actionsToDelete = (oldActionIds === null || oldActionIds === void 0 ? void 0 : oldActionIds.filter((id) => !newActionIds.includes(id))) || [];
            if (actionsToDelete.length > 0) {
                await actionServices.deleteActions(actionsToDelete);
            }
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return JSON.parse(formData.picture);
                }
            };
            const pictureInfo = getPictureInfo();
            const actionIds = await Promise.all(JSON.parse(formData.actions).map(async (action) => {
                const newAction = await actionServices.createAction(action);
                return { id: newAction.id };
            }));
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
                    actions: {
                        connect: actionIds,
                    },
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
                    actions: {
                        connect: actionIds,
                    },
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
