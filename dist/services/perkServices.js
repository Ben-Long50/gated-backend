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
    createPerk: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(formData);
        try {
            const newUser = yield prisma.perk.create({
                data: {
                    name: formData.name,
                    description: formData.description,
                    requirements: formData.requirements,
                },
            });
            return newUser;
        }
        catch (error) {
            throw new Error('Failed to create user');
        }
    }),
};
export default perkServices;
