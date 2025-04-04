import { Request, Response } from 'express';
import campaignServices from '../services/campaignServices.js';
import sessionServices from '../services/sessionServices.js';
import { $Enums, User } from '@prisma/client';
import upload from '../utils/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const campaignController = {
  getOwnerCampaigns: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res
          .status(401)
          .json({ error: 'You must be signed in to use this function' });
        return;
      }

      const campaigns = await campaignServices.getOwnerCampaigns(req.user.id);
      res.status(200).json(campaigns);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getPlayerCampaigns: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res
          .status(401)
          .json({ error: 'You must be signed in to use this function' });
        return;
      }

      const campaigns = await campaignServices.getPlayerCampaigns(req.user.id);
      res.status(200).json(campaigns);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getCampaignById: async (req: Request, res: Response) => {
    try {
      const campaign = await campaignServices.getCampaignById(
        req.params.campaignId,
      );
      res.status(200).json(campaign);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createCampaign: [
    upload.single('picture'),
    uploadToCloudinary,
    async (req: Request, res: Response) => {
      try {
        if (!req.user) {
          res.status(401).json({
            error:
              'You do not have the required permissions to create a campaign',
          });
          return;
        }

        const campaignInfo = {
          name: JSON.parse(req.body.name) as string,
          location: JSON.parse(req.body.location) as string,
          publicId: req.body.publicId,
          imageUrl: req.body.imageUrl,
          ownerId: req.user.id,
          factions: JSON.parse(req.body.factions) as $Enums.Faction[],
          players: JSON.parse(req.body.players) as Partial<User>[],
        };

        console.log(campaignInfo);

        const campaign =
          await campaignServices.createOrUpdateCampaign(campaignInfo);

        const sessionInfo = {
          name: 'Introduction',
          sessionNumber: 0,
          briefing: JSON.parse(req.body.briefing) as {
            html: string;
            nodes: string;
          },
          campaignId: campaign.id,
        };

        await sessionServices.createOrUpdateSession(sessionInfo);

        res
          .status(200)
          .json({ message: 'Successfully created campaign and session 0' });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        }
      }
    },
  ],

  deleteCampaign: async (req: Request, res: Response) => {
    try {
      await campaignServices.deleteCampaign(req.params.campaignId);
      res.status(200).json({ message: 'Successfully deleted campaign' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default campaignController;
