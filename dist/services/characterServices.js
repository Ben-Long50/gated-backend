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
            const characterList = characters.map((character) => (Object.assign(Object.assign({}, character), { perks: character.characterPerk.map((cp) => cp.perk) })));
            if (characterList.length === 0) {
                throw new Error('You have not created any characters');
            }
            return characterList;
        }
        catch (error) {
            throw new Error(error.message || 'Failed to fetch characters');
        }
    }),
    getCharacterById: (characterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const character = yield prisma.character.findUnique({
                where: {
                    id: Number(characterId),
                },
                include: {
                    characterPerk: {
                        include: {
                            perk: true,
                        },
                    },
                },
            });
            const characterInfo = Object.assign(Object.assign({}, character), { perks: character.characterPerk.map((cp) => cp.perk) });
            return characterInfo;
        }
        catch (error) {
            throw new Error(error.message || 'Failed to fetch character');
        }
    }),
    updateCharacter: (formData, userId, characterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedCharacter = yield prisma.character.update({
                where: {
                    userId,
                    id: Number(characterId),
                },
                data: {
                    userId,
                    name: JSON.parse(formData.name),
                    level: Number(JSON.parse(formData.level)),
                    profits: Number(JSON.parse(formData.profits)),
                    stats: JSON.parse(formData.stats),
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    height: Number(JSON.parse(formData.height)),
                    weight: Number(JSON.parse(formData.weight)),
                    age: Number(JSON.parse(formData.age)),
                    sex: JSON.parse(formData.sex),
                    background: JSON.parse(formData.background),
                    attributes: JSON.parse(formData.attributes),
                },
            });
            const perks = JSON.parse(formData.perks);
            const currentPerks = yield prisma.characterPerk.findMany({
                where: {
                    characterId: Number(characterId),
                },
            });
            const currentPerkIds = currentPerks.map((perk) => perk.perkId);
            const perkPromises = perks
                .map((perkId) => {
                if (!currentPerkIds.includes(perkId)) {
                    return prisma.characterPerk.create({
                        data: {
                            characterId: updatedCharacter.id,
                            perkId,
                        },
                    });
                }
                return null;
            })
                .filter(Boolean);
            yield Promise.all(perkPromises);
            return updatedCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update character');
        }
    }),
    createCharacter: (formData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newCharacter = yield prisma.character.create({
                data: {
                    userId,
                    name: JSON.parse(formData.name),
                    stats: {
                        currentHealth: 0,
                        currentSanity: 0,
                        injuries: 0,
                        insanities: 0,
                    },
                    picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
                    height: Number(JSON.parse(formData.height)),
                    weight: Number(JSON.parse(formData.weight)),
                    age: Number(JSON.parse(formData.age)),
                    sex: JSON.parse(formData.sex),
                    background: JSON.parse(formData.background),
                    attributes: JSON.parse(formData.attributes),
                },
            });
            const perks = JSON.parse(formData.perks);
            const perkPromises = perks.map((perkId) => prisma.characterPerk.create({
                data: {
                    characterId: newCharacter.id,
                    perkId,
                },
            }));
            yield Promise.all(perkPromises);
            return newCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character');
        }
    }),
};
export default characterServices;
