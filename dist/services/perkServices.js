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
const perkServices = {
    getPerks: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const perks = yield prisma.perk.findMany({ orderBy: { name: 'asc' } });
            return perks;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch perks');
        }
    }),
    getPerkById: (perkId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const perk = yield prisma.perk.findUnique({
                where: { id: Number(perkId) },
            });
            return perk;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch perk');
        }
    }),
    createPerk: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield prisma.perk.upsert({
                where: { id: Number(formData.perkId) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    requirements: formData.requirements,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    requirements: formData.requirements,
                },
            });
            return newUser;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update perk');
        }
    }),
    deletePerk: (perkId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.perk.delete({
                where: {
                    id: Number(perkId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete perk');
        }
    }),
};
export default perkServices;
