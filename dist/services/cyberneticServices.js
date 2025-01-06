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
import actionServices from './actionServices.js';
import armorServices from './armorServices.js';
import weaponServices from './weaponServices.js';
const cyberneticServices = {
    getCybernetics: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cybernetics = yield prisma.cybernetic.findMany({
                include: {
                    weapons: true,
                    armor: true,
                    actions: true,
                },
                orderBy: { name: 'asc' },
            });
            const cyberneticsDetails = yield getGroupKeywords(cybernetics);
            return cyberneticsDetails;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetics');
        }
    }),
    getCyberneticById: (cyberneticId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cybernetic = yield prisma.cybernetic.findUnique({
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
            const weaponDetails = yield getGroupKeywords(cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.weapons);
            const armorDetails = yield getGroupKeywords(cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.armor);
            const cyberneticDetails = yield getItemKeywords(cybernetic);
            return Object.assign(Object.assign({}, cyberneticDetails), { weapons: weaponDetails, armor: armorDetails });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch cybernetic');
        }
    }),
    createCybernetic: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cybernetic = yield prisma.cybernetic.findUnique({
                where: { name: JSON.parse(formData.name) },
                include: {
                    weapons: { select: { name: true } },
                    armor: { select: { name: true } },
                    actions: { select: { name: true } },
                },
            });
            const weaponsToDelete = (cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.weapons.filter((weapon) => !JSON.parse(formData.weapons).includes(weapon))) || [];
            const armorToDelete = (cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.armor.filter((armor) => !JSON.parse(formData.armor).includes(armor))) || [];
            const actionsToDelete = (cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.actions.filter((action) => !JSON.parse(formData.actions).includes(action))) || [];
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return JSON.parse(formData.picture);
                }
            };
            const pictureInfo = getPictureInfo();
            //Delete (from the database) integrated weapon pieces that have been removed via the submitted form
            yield Promise.all(weaponsToDelete.map((weapon) => __awaiter(void 0, void 0, void 0, function* () {
                yield weaponServices.deleteWeaponByName(weapon.name);
            })));
            //Delete (from the database) integrated armor pieces that have been removed via the submitted form
            yield Promise.all(armorToDelete.map((armor) => __awaiter(void 0, void 0, void 0, function* () {
                yield armorServices.deleteArmorByName(armor.name);
            })));
            //Delete (from the database) unqiue actions that have been removed via the submitted form
            yield Promise.all(actionsToDelete.map((action) => __awaiter(void 0, void 0, void 0, function* () {
                yield actionServices.deleteActionByName(action.name);
            })));
            const weaponIds = yield Promise.all(JSON.parse(formData.weapons).map((weapon) => __awaiter(void 0, void 0, void 0, function* () {
                const newWeapon = yield weaponServices.createIntegratedWeapon(weapon);
                return { id: newWeapon.id };
            })));
            const armorIds = yield Promise.all(JSON.parse(formData.armor).map((armor) => __awaiter(void 0, void 0, void 0, function* () {
                const newArmor = yield armorServices.createIntegratedArmor(armor);
                return { id: newArmor.id };
            })));
            const actionIds = yield Promise.all(JSON.parse(formData.actions).map((action) => __awaiter(void 0, void 0, void 0, function* () {
                const newAction = yield actionServices.createAction(action);
                return { id: newAction.id };
            })));
            const newCybernetic = yield prisma.cybernetic.upsert({
                where: { id: Number(JSON.parse(formData.cyberneticId)) || 0 },
                update: {
                    name: JSON.parse(formData.name),
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
                },
                create: {
                    name: JSON.parse(formData.name),
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
                },
            });
            return newCybernetic;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create cybernetic');
        }
    }),
    deleteCybernetic: (cyberneticId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.cybernetic.delete({
                where: {
                    id: Number(cyberneticId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete cybernetic');
        }
    }),
};
export default cyberneticServices;
