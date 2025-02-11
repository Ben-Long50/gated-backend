import prisma from '../config/database.js';
const characterStatServices = {
    editCurrentHealth: async (characterId, value) => {
        try {
            const character = await prisma.character.findUnique({
                where: {
                    id: Number(characterId),
                },
                select: { stats: true },
            });
            if (!character) {
                throw new Error('Character not found');
            }
            const statsObject = character.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentHealth: statsObject.currentHealth + Number(value) });
            await prisma.character.update({
                where: {
                    id: Number(characterId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update current health');
        }
    },
    editCurrentSanity: async (characterId, value) => {
        try {
            const character = await prisma.character.findUnique({
                where: {
                    id: Number(characterId),
                },
                select: { stats: true },
            });
            if (!character) {
                throw new Error('Character not found');
            }
            const statsObject = character.stats;
            const newStats = Object.assign(Object.assign({}, statsObject), { currentSanity: statsObject.currentSanity + Number(value) });
            await prisma.character.update({
                where: {
                    id: Number(characterId),
                },
                data: {
                    stats: newStats,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to update current sanity');
        }
    },
};
export default characterStatServices;
