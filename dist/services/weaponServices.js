import prisma from '../config/database.js';
import { getItemKeywords } from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
const weaponServices = {
    getWeapons: async () => {
        try {
            const weapons = await prisma.weapon.findMany({
                where: {
                    characterInventoryId: null,
                    vehicleId: null,
                    cyberneticId: null,
                },
                include: { actions: true },
                orderBy: { name: 'asc' },
            });
            return weapons;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch weapons');
        }
    },
    getWeaponById: async (weaponId) => {
        try {
            const weapon = await prisma.weapon.findUnique({
                where: {
                    id: Number(weaponId),
                },
                include: { actions: true },
            });
            if (!weapon) {
                throw new Error('Could not find weapon');
            }
            const weaponDetails = await getItemKeywords(weapon);
            return weaponDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch weapon');
        }
    },
    createIntegratedWeapon: async (formData, picture, rarity, grade) => {
        try {
            const newWeapon = await prisma.weapon.upsert({
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
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update integrated weapon');
        }
    },
    createWeapon: async (formData) => {
        var _a;
        try {
            const weapon = await prisma.weapon.findUnique({
                where: { id: Number(JSON.parse(formData.weaponId)) },
                include: {
                    actions: { select: { id: true } },
                },
            });
            const oldActionIds = (_a = weapon === null || weapon === void 0 ? void 0 : weapon.actions) === null || _a === void 0 ? void 0 : _a.map((id) => id.id);
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
            const newWeapon = await prisma.weapon.upsert({
                where: { id: Number(JSON.parse(formData.weaponId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
                    rarity: JSON.parse(formData.rarity),
                    grade: Number(JSON.parse(formData.grade)),
                    picture: pictureInfo,
                    stats: JSON.parse(formData.stats),
                    price: Number(JSON.parse(formData.price)),
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
            return newWeapon;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update weapon');
        }
    },
    deleteWeapon: async (weaponId) => {
        try {
            await prisma.weapon.delete({
                where: {
                    id: Number(weaponId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete weapon');
        }
    },
    deleteWeapons: async (weaponIds) => {
        try {
            await prisma.weapon.deleteMany({
                where: {
                    id: { in: weaponIds },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete weapons');
        }
    },
};
export default weaponServices;
