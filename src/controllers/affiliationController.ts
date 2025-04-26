import { Character, Faction, Gang } from '@prisma/client';
import upload from '../utils/multer.js';
import { Request, Response } from 'express';
import affiliationServices from '../services/affiliationServices.js';

function validateAffiliation(
  primaryId: number,
  parsedBody: {
    faction?: Faction;
    gang?: Gang;
    character?: Character;
    value: number;
  },
) {
  const affiliationIds = [
    primaryId,
    parsedBody.faction?.id,
    parsedBody.gang?.id,
    parsedBody.character?.id,
  ].filter((id) => !!id);

  //Make sure there are not more than 2 entities involved in the new affiliation
  if (affiliationIds.length > 2) {
    throw new Error(
      'There are too many entities involved in this affiliation. Only two entities are allowed',
    );
  }

  //Make sure there are not less than 2 entities involved in the new affiliation
  if (affiliationIds.length < 2) {
    throw new Error(
      'There are not enought entities involved in this affiliation. Only two entities are allowed',
    );
  }

  return;
}

const affiliationController = {
  getAffiliationById: async (req: Request, res: Response) => {
    try {
      const affiliation = await affiliationServices.getAffiliationById(
        Number(req.params.affiliationId),
      );

      res.status(200).json(affiliation);
    } catch (error: any) {
      console.error(error.message);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createFactionAffiliation: [
    upload.none(),
    async (req: Request, res: Response) => {
      try {
        const parsedBody = Object.fromEntries(
          Object.entries(req.body).map(([key, value]: [string, any]) => [
            key,
            JSON.parse(value),
          ]),
        ) as {
          faction?: Faction;
          gang?: Gang;
          character?: Character;
          value: number;
        };

        validateAffiliation(Number(req.params.factionId), parsedBody);

        await affiliationServices.createFactionAffiliation(
          Number(req.params.factionId),
          parsedBody,
        );
        res
          .status(200)
          .json({ message: 'Successfully created faction affiliation' });
      } catch (error: any) {
        console.error(error.message);

        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  createGangAffiliation: [
    upload.none(),
    async (req: Request, res: Response) => {
      try {
        const parsedBody = Object.fromEntries(
          Object.entries(req.body).map(([key, value]: [string, any]) => [
            key,
            JSON.parse(value),
          ]),
        ) as {
          faction?: Faction;
          gang?: Gang;
          character?: Character;
          value: number;
        };

        validateAffiliation(Number(req.params.gangId), parsedBody);

        await affiliationServices.createGangAffiliation(
          Number(req.params.gangId),
          parsedBody,
        );
        res
          .status(200)
          .json({ message: 'Successfully created gang affiliation' });
      } catch (error: any) {
        console.error(error.message);

        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  createCharacterAffiliation: [
    upload.none(),
    async (req: Request, res: Response) => {
      try {
        const parsedBody = Object.fromEntries(
          Object.entries(req.body).map(([key, value]: [string, any]) => [
            key,
            JSON.parse(value),
          ]),
        ) as {
          faction?: Faction;
          gang?: Gang;
          character?: Character;
          value: number;
        };

        validateAffiliation(Number(req.params.characterId), parsedBody);

        await affiliationServices.createCharacterAffiliation(
          Number(req.params.characterId),
          parsedBody,
        );
        res
          .status(200)
          .json({ message: 'Successfully created character affiliation' });
      } catch (error: any) {
        console.error(error.message);
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  updateAffiliationValue: async (req: Request, res: Response) => {
    try {
      await affiliationServices.updateAffiliationValue(
        Number(req.params.affiliationId),
        req.body.value,
      );

      res
        .status(200)
        .json({ message: 'Successfully updated affiliation value' });
    } catch (error: any) {
      console.error(error.message);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  deleteAffiliation: async (req: Request, res: Response) => {
    try {
      await affiliationServices.deleteAffiliation(
        Number(req.params.affiliationId),
      );

      res.status(200).json({ message: 'Successfully deleted affiliation' });
    } catch (error: any) {
      console.error(error.message);
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default affiliationController;
