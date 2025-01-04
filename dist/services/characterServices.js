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
                    perks: true,
                },
                orderBy: { level: 'desc' },
            });
            if (characters.length === 0) {
                throw new Error('You have not created any characters');
            }
            return characters;
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
                    perks: true,
                },
            });
            return character;
        }
        catch (error) {
            throw new Error(error.message || 'Failed to fetch character');
        }
    }),
    createCharacter: (formData, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const perks = JSON.parse(formData.perks);
            const stats = JSON.parse(formData.stats);
            const newCharacter = yield prisma.character.create({
                data: {
                    userId,
                    firstName: JSON.parse(formData.firstName),
                    lastName: JSON.parse(formData.lastName),
                    stats: {
                        currentHealth: stats.currentHealth,
                        currentSanity: stats.currentSanity,
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
                    perks: {
                        connect: perks.map((id) => ({ id })),
                    },
                },
            });
            return newCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create character');
        }
    }),
    updateCharacter: (formData, userId, characterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newPerks = JSON.parse(formData.perks).map((id) => ({ id }));
            const oldPerks = yield prisma.character
                .findUnique({
                where: {
                    userId,
                    id: Number(characterId),
                },
                select: {
                    perks: { select: { id: true } },
                },
            })
                .then((character) => (character === null || character === void 0 ? void 0 : character.perks.filter((perk) => !newPerks.includes(perk.id))) ||
                [])
                .then((perks) => perks.map((perk) => ({ id: perk.id })));
            const data = Object.assign(Object.assign({ userId, firstName: JSON.parse(formData.firstName), lastName: JSON.parse(formData.lastName), level: Number(JSON.parse(formData.level)), profits: Number(JSON.parse(formData.profits)), stats: JSON.parse(formData.stats) }, (formData.picture && {
                picture: { publicId: formData.publicId, imageUrl: formData.imageUrl },
            })), { height: Number(JSON.parse(formData.height)), weight: Number(JSON.parse(formData.weight)), age: Number(JSON.parse(formData.age)), sex: JSON.parse(formData.sex), background: JSON.parse(formData.background), attributes: JSON.parse(formData.attributes) });
            const updatedCharacter = yield prisma.character.update({
                where: {
                    userId,
                    id: Number(characterId),
                },
                data: Object.assign(Object.assign({}, data), { perks: {
                        disconnect: oldPerks,
                        connect: newPerks,
                    } }),
            });
            return updatedCharacter;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update character');
        }
    }),
    deleteCharacter: (userId, characterId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.character.delete({
                where: {
                    userId: userId,
                    id: Number(characterId),
                },
            });
        }
        catch (error) {
            throw new Error(error.message || 'Failed to delete character');
        }
    }),
};
export default characterServices;
