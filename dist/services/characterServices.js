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
const characterServices = {
    getCharacters: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const characters = yield prisma.character.findMany({
                where: {
                    userId,
                },
                include: {
                    characterPerk: {
                        include: {
                            perk: true,
                        },
                    },
                },
            });
            return characters.map((character) => (Object.assign(Object.assign({}, character), { perks: character.characterPerk.map((cp) => cp.perk) })));
        }
        catch (error) {
            throw new Error('Failed to fetch characters');
        }
    }),
    createCharacter: (formData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(formData);
            const newCharacter = yield prisma.character.create({
                data: {
                    userId,
                    name: formData.name,
                    height: Number(formData.height),
                    weight: Number(formData.weight),
                    age: Number(formData.age),
                    sex: formData.sex,
                    background: formData.background,
                    attributes: formData.attributes,
                },
            });
            console.log(newCharacter);
            yield prisma.characterPerk.create({
                data: {
                    characterId: newCharacter.id,
                    perkId: formData.perks[0],
                },
            });
            return newCharacter;
        }
        catch (error) {
            throw new Error('Failed to create character');
        }
    }),
};
export default characterServices;
