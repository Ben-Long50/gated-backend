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
const armorServices = {
    getArmor: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const armor = yield prisma.armor.findMany({
                include: {
                    keywords: true,
                },
                orderBy: { name: 'asc' },
            });
            return armor;
        }
        catch (error) {
            throw new Error(error.message || 'Failed to fetch armor');
        }
    }),
    getArmorById: (armorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const armor = yield prisma.armor.findUnique({
                where: {
                    id: Number(armorId),
                },
                include: {
                    keywords: true,
                },
            });
            return armor;
        }
        catch (error) {
            throw new Error(error.message || 'Failed to fetch armor');
        }
    }),
    createArmor: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keywords = JSON.parse(formData.keywords).map((id) => ({
                id,
            }));
            const newArmor = yield prisma.armor.create({
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
            return newArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create armor');
        }
    }),
    updateArmor: (formData, armorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newKeywords = JSON.parse(formData.keywords).map((id) => ({
                id,
            }));
            const oldKeywords = yield prisma.armor
                .findUnique({
                where: {
                    id: Number(armorId),
                },
                select: {
                    keywords: { select: { id: true } },
                },
            })
                .then((armor) => (armor === null || armor === void 0 ? void 0 : armor.keywords.filter((keyword) => !newKeywords.includes(keyword.id))) || [])
                .then((keywords) => keywords.map((keyword) => ({ id: keyword.id })));
            const data = Object.assign(Object.assign({ name: JSON.parse(formData.name) }, (formData.picture && {
                picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
            })), { stats: JSON.parse(formData.stats), price: JSON.parse(formData.price), description: JSON.parse(formData.description) });
            const updatedArmor = yield prisma.armor.update({
                where: {
                    id: Number(armorId),
                },
                data: Object.assign(Object.assign({}, data), { perks: {
                        disconnect: oldKeywords,
                        connect: newKeywords,
                    } }),
            });
            return updatedArmor;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update armor');
        }
    }),
    deleteArmor: (armorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.armor.delete({
                where: {
                    id: Number(armorId),
                },
            });
        }
        catch (error) {
            throw new Error(error.message || 'Failed to delete armor');
        }
    }),
};
export default armorServices;
