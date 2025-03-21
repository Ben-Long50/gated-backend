var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import prisma from '../config/database.js';
const perkServices = {
    getPerks: async () => {
        try {
            const perks = await prisma.perk.findMany({
                include: { modifiers: { include: { action: true } } },
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
                include: { modifiers: { include: { action: true } } },
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
            const oldPerk = await prisma.perk.findUnique({
                where: { id: Number(formData.perkId) || 0 },
                select: { modifiers: { select: { id: true } } },
            });
            if (oldPerk) {
                const oldModifierIds = oldPerk.modifiers.map((modifier) => modifier.id);
                await prisma.modifier.deleteMany({
                    where: { id: { in: oldModifierIds } },
                });
            }
            const newUser = await prisma.perk.upsert({
                where: { id: Number(formData.perkId) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    modifiers: {
                        createMany: {
                            data: formData.modifiers.map((_a) => {
                                var { action } = _a, modifier = __rest(_a, ["action"]);
                                return (Object.assign(Object.assign({}, modifier), { actionId: action ? Number(action) : null }));
                            }),
                        },
                    },
                    requirements: formData.requirements,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    modifiers: {
                        createMany: {
                            data: formData.modifiers.map((_a) => {
                                var { action } = _a, modifier = __rest(_a, ["action"]);
                                return (Object.assign(Object.assign({}, modifier), { actionId: action ? Number(action) : null }));
                            }),
                        },
                    },
                    requirements: formData.requirements,
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
