import prisma from '../config/database.js';
import { getGroupKeywords, getItemKeywords, } from '../utils/getAssociatedKeywords.js';
import actionServices from './actionServices.js';
import armorServices from './armorServices.js';
import weaponServices from './weaponServices.js';
const cyberneticServices = {
    getCybernetics: async () => {
        try {
            const cybernetics = await prisma.cybernetic.findMany({
                where: { characterInventoryId: null },
                include: {
                    weapons: true,
                    armor: true,
                    actions: true,
                },
                orderBy: { name: 'asc' },
            });
            return cybernetics;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetics');
        }
    },
    getCyberneticById: async (cyberneticId) => {
        try {
            const cybernetic = await prisma.cybernetic.findUnique({
                where: {
                    id: Number(cyberneticId),
                },
                include: {
                    weapons: true,
                    armor: true,
                    actions: true,
                },
            });
            if (!cybernetic) {
                throw new Error('Could not find cybernetic');
            }
            const weaponDetails = await getGroupKeywords(cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.weapons);
            const armorDetails = await getGroupKeywords(cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.armor);
            const cyberneticDetails = await getItemKeywords(cybernetic);
            return Object.assign(Object.assign({}, cyberneticDetails), { weapons: weaponDetails, armor: armorDetails });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetic');
        }
    },
    createCybernetic: async (formData) => {
        var _a, _b, _c;
        try {
            const cybernetic = await prisma.cybernetic.findUnique({
                where: { id: Number(JSON.parse(formData.cyberneticId)) },
                include: {
                    weapons: { select: { id: true } },
                    armor: { select: { id: true } },
                    actions: { select: { id: true } },
                },
            });
            const oldWeaponIds = (_a = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.weapons) === null || _a === void 0 ? void 0 : _a.map((id) => id.id);
            const newWeaponIds = JSON.parse(formData.weapons).map((weapon) => weapon.id);
            const weaponsToDelete = (oldWeaponIds === null || oldWeaponIds === void 0 ? void 0 : oldWeaponIds.filter((id) => !newWeaponIds.includes(id))) || [];
            if (weaponsToDelete.length > 0) {
                await weaponServices.deleteWeapons(weaponsToDelete);
            }
            const oldArmorIds = (_b = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.armor) === null || _b === void 0 ? void 0 : _b.map((id) => id.id);
            const newArmorIds = JSON.parse(formData.armor).map((armor) => armor.id);
            const armorToDelete = (oldArmorIds === null || oldArmorIds === void 0 ? void 0 : oldArmorIds.filter((id) => !newArmorIds.includes(id))) || [];
            if (armorToDelete.length > 0) {
                await armorServices.deleteArmors(armorToDelete);
            }
            const oldActionIds = (_c = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.actions) === null || _c === void 0 ? void 0 : _c.map((id) => id.id);
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
            const weaponIds = await Promise.all(JSON.parse(formData.weapons).map(async (weapon) => {
                const newWeapon = await weaponServices.createIntegratedWeapon(weapon, JSON.parse(formData.rarity), Number(JSON.parse(formData.grade)));
                return { id: newWeapon.id };
            }));
            const armorIds = await Promise.all(JSON.parse(formData.armor).map(async (armor) => {
                const newArmor = await armorServices.createIntegratedArmor(armor, JSON.parse(formData.rarity), Number(JSON.parse(formData.grade)));
                return { id: newArmor.id };
            }));
            const actionIds = await Promise.all(JSON.parse(formData.actions).map(async (action) => {
                const newAction = await actionServices.createAction(action);
                return { id: newAction.id };
            }));
            const newCybernetic = await prisma.cybernetic.upsert({
                where: { id: Number(JSON.parse(formData.cyberneticId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
                    rarity: JSON.parse(formData.rarity),
                    grade: Number(JSON.parse(formData.grade)),
                    cyberneticType: JSON.parse(formData.cyberneticType),
                    stats: JSON.parse(formData.stats),
                    picture: pictureInfo,
                    description: JSON.parse(formData.description),
                    body: JSON.parse(formData.body),
                    price: JSON.parse(formData.price),
                    weapons: {
                        connect: weaponIds,
                    },
                    armor: {
                        connect: armorIds,
                    },
                    actions: {
                        connect: actionIds,
                    },
                    keywords: JSON.parse(formData.keywords),
                    modifiers: JSON.parse(formData.modifiers),
                },
                create: {
                    name: JSON.parse(formData.name),
                    rarity: JSON.parse(formData.rarity),
                    grade: Number(JSON.parse(formData.grade)),
                    cyberneticType: JSON.parse(formData.cyberneticType),
                    stats: JSON.parse(formData.stats),
                    picture: pictureInfo,
                    description: JSON.parse(formData.description),
                    body: JSON.parse(formData.body),
                    price: JSON.parse(formData.price),
                    weapons: {
                        connect: weaponIds,
                    },
                    armor: {
                        connect: armorIds,
                    },
                    actions: {
                        connect: actionIds,
                    },
                    keywords: JSON.parse(formData.keywords),
                    modifiers: JSON.parse(formData.modifiers),
                },
            });
            return newCybernetic;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create cybernetic');
        }
    },
    deleteCybernetic: async (cyberneticId) => {
        try {
            await prisma.cybernetic.delete({
                where: {
                    id: Number(cyberneticId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete cybernetic');
        }
    },
};
export default cyberneticServices;
