import { Character, Faction, Gang } from '@prisma/client';
import prisma from '../config/database.js';

function validateNewAffiliation(
  entity: {
    campaignId: number | null;
    affiliations: {
      factions?: Faction[];
      gangs?: Gang[];
      characters?: Character[];
    }[];
  },
  formData: {
    faction?: Faction;
    gang?: Gang;
    character?: Character;
    value: number;
  },
) {
  const match = entity?.affiliations.find((affiliation) => {
    if (
      affiliation.factions?.some(
        (faction: Faction) => faction.id === formData.faction?.id,
      )
    ) {
      return true;
    } else if (
      affiliation.gangs?.some((gang: Gang) => gang.id === formData.gang?.id)
    ) {
      return true;
    } else if (
      affiliation.characters?.some(
        (character: Character) => character.id === formData.character?.id,
      )
    ) {
      return true;
    } else return false;
  });

  if (match) {
    throw new Error('An affiliation with these entities already exists');
  }

  return;
}

const affiliationServices = {
  getAffiliationById: async (affiliationId: number) => {
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
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create faction affiliation');
    }
  },

  createFactionAffiliation: async (
    factionId: number,
    formData: {
      faction?: Faction;
      gang?: Gang;
      character?: Character;
      value: number;
    },
  ) => {
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

      if (!character?.affiliations) {
        throw new Error(
          'There are no existing affiliations associated with this faction',
        );
      }

      if (!character?.campaignId) {
        throw new Error(
          'This faction must belong to a campaign before affiliations can be assigned',
        );
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
          campaign: { connect: { id: character?.campaignId } },
          factions,
          gangs,
          characters,
          value: formData.value,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create faction affiliation');
    }
  },

  createGangAffiliation: async (
    gangId: number,
    formData: {
      faction?: Faction;
      gang?: Gang;
      character?: Character;
      value: number;
    },
  ) => {
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

      if (!gang?.affiliations) {
        throw new Error(
          'There are no existing affiliations associated with this gang',
        );
      }

      if (!gang?.campaignId) {
        throw new Error(
          'This gang must belong to a campaign before affiliations can be assigned',
        );
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
          campaign: { connect: { id: gang?.campaignId } },
          factions,
          gangs,
          characters,
          value: formData.value,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to create gang affiliation');
    }
  },

  createCharacterAffiliation: async (
    characterId: number,
    formData: {
      faction?: Faction;
      gang?: Gang;
      character?: Character;
      value: number;
    },
  ) => {
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

      if (!character?.affiliations) {
        throw new Error(
          'There are no existing affiliations associated with this character',
        );
      }

      if (!character?.campaignId) {
        throw new Error(
          'This character must belong to a campaign before affiliations can be assigned',
        );
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
          campaign: { connect: { id: character?.campaignId } },
          factions,
          gangs,
          characters,
          value: formData.value,
        },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error.message || 'Failed to create character affiliation',
      );
    }
  },

  updateAffiliationValue: async (affiliationId: number, value: number) => {
    try {
      await prisma.affiliation.update({
        where: { id: affiliationId },
        data: { value },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to update affiliation value');
    }
  },

  deleteAffiliation: async (affiliationId: number) => {
    try {
      await prisma.affiliation.delete({ where: { id: affiliationId } });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || 'Failed to delete affiliation');
    }
  },
};

export default affiliationServices;
