import prisma from '../config/database.js';
const perkServices = {
    getPerks: async () => {
        try {
            const perks = await prisma.perk.findMany({
                orderBy: { name: 'asc' },
            });
            return perks;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch perks');
        }
    },
    getPerkById: async (perkId) => {
        try {
            const perk = await prisma.perk.findUnique({
                where: { id: Number(perkId) },
            });
            return perk;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch perk');
        }
    },
    createPerk: async (formData) => {
        try {
            const newUser = await prisma.perk.upsert({
                where: { id: Number(formData.perkId) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    modifiers: Object.assign({}, formData.modifiers),
                    attributes: formData.attributes,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    modifiers: Object.assign({}, formData.modifiers),
                    attributes: formData.attributes,
                },
            });
            return newUser;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update perk');
        }
    },
    deletePerk: async (perkId) => {
        try {
            await prisma.perk.delete({
                where: {
                    id: Number(perkId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete perk');
        }
    },
};
export default perkServices;
