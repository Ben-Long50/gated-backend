import notificationServices from '../services/notificationServices.js';
const notificationController = {
    getNotifications: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            const notifications = await notificationServices.getNotifications(req.user.id);
            res.status(200).json(notifications);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    // createNotification: async (req: Request, res: Response) => {
    //   try {
    //     if (!req.user) {
    //       res.status(401).json({
    //         error:
    //           'You do not have the required permissions to create a notification',
    //       });
    //       return;
    //     }
    //     const notificationInfo = {
    //       name: JSON.parse(req.body.name) as string,
    //       location: JSON.parse(req.body.location) as string,
    //       publicId: req.body.publicId,
    //       imageUrl: req.body.imageUrl,
    //       ownerId: req.user.id,
    //       affiliation: Number(JSON.parse(req.body.affiliation)),
    //       factions: JSON.parse(req.body.factions) as {
    //         factionType: $Enums.FactionType;
    //         name: string;
    //       }[],
    //       players: JSON.parse(req.body.players) as Partial<User>[],
    //     };
    //     const notification =
    //       await notificationServices.createOrUpdateNotification(notificationInfo);
    //     const sessionInfo = {
    //       name: 'Introduction',
    //       sessionNumber: 0,
    //       briefing: JSON.parse(req.body.briefing) as {
    //         html: string;
    //         nodes: string;
    //       },
    //       notificationId: notification.id,
    //     };
    //     await sessionServices.createOrUpdateSession(sessionInfo);
    //     res
    //       .status(200)
    //       .json({ message: 'Successfully created notification and session 0' });
    //   } catch (error) {
    //     if (error instanceof Error) {
    //       res.status(500).json({ error: error.message });
    //     }
    //   }
    // },
    deleteNotification: async (req, res) => {
        try {
            await notificationServices.deleteNotification(Number(req.params.notificationId));
            res.status(200).json({ message: 'Successfully deleted notification' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteNotifications: async (req, res) => {
        try {
            if (!req.user) {
                res
                    .status(401)
                    .json({ error: 'You must be signed in to use this function' });
                return;
            }
            await notificationServices.deleteNotifications(req.user.id);
            res.status(200).json({ message: 'Successfully deleted notification' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
export default notificationController;
