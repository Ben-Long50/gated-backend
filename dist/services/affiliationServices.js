import prisma from '../config/database.js';
function validateNewAffiliation(entity, formData) {
    const match = entity === null || entity === void 0 ? void 0 : entity.affiliations.find((affiliation) => {
        var _a, _b, _c;
        if ((_a = affiliation.factions) === null || _a === void 0 ? void 0 : _a.some((faction) => { var _a; return faction.id === ((_a = formData.faction) === null || _a === void 0 ? void 0 : _a.id); })) {
            return true;
        }
        else if ((_b = affiliation.gangs) === null || _b === void 0 ? void 0 : _b.some((gang) => { var _a; return gang.id === ((_a = formData.gang) === null || _a === void 0 ? void 0 : _a.id); })) {
            return true;
        }
        else if ((_c = affiliation.characters) === null || _c === void 0 ? void 0 : _c.some((character) => { var _a; return character.id === ((_a = formData.character) === null || _a === void 0 ? void 0 : _a.id); })) {
            return true;
        }
        else
            return false;
    });
    if (match) {
        throw new Error('An affiliation with these entities already exists');
    }
    return;
}
const affiliationServices = {
    getAffiliationById: async (affiliationId) => {
        try {
            const affiliation = await prisma.affiliation.findUnique({
                where: { id: affiliationId },
                include: {
                    factions: true,
                    gangs: true,
                    characters: true,
                    campaign: { select: { ownerId: true } },
                },
            });
            return affiliation;
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create faction affiliation');
        }
    },
    getBatchAffiliations: async (affiliationIds) => {
        try {
            const affiliations = prisma.affiliation.findMany({
                where: {
                    id: { in: affiliationIds },
                },
                include: {
                    factions: true,
                    gangs: true,
                    characters: true,
                    campaign: { select: { ownerId: true } },
                },
            });
            return affiliations;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch characters');
        }
    },
    createFactionAffiliation: async (factionId, formData) => {
        try {
            const character = await prisma.faction.findUnique({
                where: {
                    id: factionId,
                },
                select: {
                    campaignId: true,
                    affiliations: {
                        select: { characters: true, gangs: true, factions: true },
                    },
                },
            });
            if (!(character === null || character === void 0 ? void 0 : character.affiliations)) {
                throw new Error('There are no existing affiliations associated with this faction');
            }
            if (!(character === null || character === void 0 ? void 0 : character.campaignId)) {
                throw new Error('This faction must belong to a campaign before affiliations can be assigned');
            }
            validateNewAffiliation(character, formData);
            const factions = formData.faction
                ? { connect: [{ id: formData.faction.id }, { id: factionId }] }
                : { connect: [{ id: factionId }] };
            const gangs = formData.gang
                ? { connect: [{ id: formData.gang.id }] }
                : undefined;
            const characters = formData.character
                ? { connect: [{ id: formData.character.id }] }
                : undefined;
            await prisma.affiliation.create({
                data: {
                    campaign: { connect: { id: character === null || character === void 0 ? void 0 : character.campaignId } },
                    factions,
                    gangs,
                    characters,
                    value: formData.value,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create faction affiliation');
        }
    },
    createGangAffiliation: async (gangId, formData) => {
        try {
            const gang = await prisma.gang.findUnique({
                where: {
                    id: gangId,
                },
                select: {
                    campaignId: true,
                    affiliations: {
                        select: { characters: true, gangs: true, factions: true },
                    },
                },
            });
            if (!(gang === null || gang === void 0 ? void 0 : gang.affiliations)) {
                throw new Error('There are no existing affiliations associated with this gang');
            }
            if (!(gang === null || gang === void 0 ? void 0 : gang.campaignId)) {
                throw new Error('This gang must belong to a campaign before affiliations can be assigned');
            }
            validateNewAffiliation(gang, formData);
            const factions = formData.faction
                ? { connect: [{ id: formData.faction.id }] }
                : undefined;
            const gangs = formData.gang
                ? { connect: [{ id: formData.gang.id }, { id: gangId }] }
                : { connect: [{ id: gangId }] };
            const characters = formData.character
                ? { connect: [{ id: formData.character.id }] }
                : undefined;
            await prisma.affiliation.create({
                data: {
                    campaign: { connect: { id: gang === null || gang === void 0 ? void 0 : gang.campaignId } },
                    factions,
                    gangs,
                    characters,
                    value: formData.value,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create gang affiliation');
        }
    },
    createCharacterAffiliation: async (characterId, formData) => {
        try {
            const character = await prisma.character.findUnique({
                where: {
                    id: characterId,
                },
                select: {
                    campaignId: true,
                    affiliations: {
                        select: { characters: true, gangs: true, factions: true },
                    },
                },
            });
            if (!(character === null || character === void 0 ? void 0 : character.affiliations)) {
                throw new Error('There are no existing affiliations associated with this character');
            }
            if (!(character === null || character === void 0 ? void 0 : character.campaignId)) {
                throw new Error('This character must belong to a campaign before affiliations can be assigned');
            }
            validateNewAffiliation(character, formData);
            const factions = formData.faction
                ? { connect: [{ id: formData.faction.id }] }
                : undefined;
            const gangs = formData.gang
                ? { connect: [{ id: formData.gang.id }] }
                : undefined;
            const characters = formData.character
                ? { connect: [{ id: formData.character.id }, { id: characterId }] }
                : { connect: [{ id: characterId }] };
            await prisma.affiliation.create({
                data: {
                    campaign: { connect: { id: character === null || character === void 0 ? void 0 : character.campaignId } },
                    factions,
                    gangs,
                    characters,
                    value: formData.value,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to create character affiliation');
        }
    },
    updateAffiliationValue: async (affiliationId, value) => {
        try {
            await prisma.affiliation.update({
                where: { id: affiliationId },
                data: { value },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to update affiliation value');
        }
    },
    deleteAffiliation: async (affiliationId) => {
        try {
            await prisma.affiliation.delete({ where: { id: affiliationId } });
        }
        catch (error) {
            console.error(error);
            throw new Error(error.message || 'Failed to delete affiliation');
        }
    },
};
export default affiliationServices;
