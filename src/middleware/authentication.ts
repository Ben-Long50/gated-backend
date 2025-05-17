import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import prisma from '../config/database.js';

const authentication = {
  issueJwt: (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.sign(
        { id: req.user?.id },
        process.env.JWT_SECRET,
        {
          expiresIn: '8h',
        },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: 'Error generating token' });
            return;
          }
          req.token = token;
          next();
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
      }
    }
  },

  authenticate: passport.authenticate('jwt', { session: false }),

  authenticateSuperadmin: (req: Request, res: Response, next: NextFunction) => {
    const allowedRoles = ['SUPERADMIN'];
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    } else if (req.user.role && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'You do not have the required permissions to use this function',
      });
      return;
    }
    return next();
  },

  authenticateAdmin: (req: Request, res: Response, next: NextFunction) => {
    const allowedRoles = ['SUPERADMIN', 'ADMIN'];
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    } else if (req.user.role && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'You do not have the required permissions to use this function',
      });
      return;
    }
    return next();
  },

  authenticateUser: (req: Request, res: Response, next: NextFunction) => {
    const allowedRoles = ['SUPERADMIN', 'ADMIN', 'USER'];
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    } else if (req.user.role && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'You do not have the required permissions to use this function',
      });
      return;
    }
    return next();
  },

  authenticateWeaponModification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    }

    const weapon = await prisma.item.findUnique({
      where: { id: Number(req.params.weaponId), itemType: 'weapon' },
      select: {
        characterInventory: {
          select: {
            character: { select: { userId: true } },
          },
        },
      },
    });

    const userId = weapon?.characterInventory?.character?.userId || null;

    if (req.user.id !== userId) {
      res.status(403).json({
        error: 'You do not have the required permissions to modify this weapon',
      });
      return;
    }
    return next();
  },

  authenticateArmorModification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    }

    const armor = await prisma.item.findUnique({
      where: { id: Number(req.params.armorId), itemType: 'armor' },
      select: {
        characterInventory: {
          select: {
            character: { select: { userId: true } },
          },
        },
      },
    });

    const userId = armor?.characterInventory?.character?.userId || null;

    if (req.user.id !== userId) {
      res.status(403).json({
        error: 'You do not have the required permissions to modify this armor',
      });
      return;
    }
    return next();
  },

  authenticateCyberneticModification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    }

    const cybernetic = await prisma.item.findUnique({
      where: { id: Number(req.params.cyberneticId), itemType: 'cybernetic' },
      select: {
        characterInventory: {
          select: {
            character: { select: { userId: true } },
          },
        },
      },
    });

    const userId = cybernetic?.characterInventory?.character?.userId || null;

    if (req.user.id !== userId) {
      res.status(403).json({
        error:
          'You do not have the required permissions to modify this cybernetic',
      });
      return;
    }
    return next();
  },

  authenticateVehicleModification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    }

    const vehicle = await prisma.item.findUnique({
      where: { id: Number(req.params.vehicleId), itemType: 'vehicle' },
      select: {
        characterInventory: {
          select: {
            character: { select: { userId: true } },
          },
        },
      },
    });

    const userId = vehicle?.characterInventory?.character?.userId || null;

    if (req.user.id !== userId) {
      res.status(403).json({
        error:
          'You do not have the required permissions to modify this vehicle',
      });
      return;
    }
    return next();
  },

  authenticateDroneModification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    }

    const drone = await prisma.item.findUnique({
      where: { id: Number(req.params.droneId), itemType: 'drone' },
      select: {
        characterInventory: {
          select: {
            character: { select: { userId: true } },
          },
        },
      },
    });

    const userId = drone?.characterInventory?.character?.userId || null;

    if (req.user.id !== userId) {
      res.status(403).json({
        error: 'You do not have the required permissions to modify this drone',
      });
      return;
    }
    return next();
  },

  authenticateItemModification: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
      return;
    }

    const item = await prisma.item.findUnique({
      where: { id: Number(req.params.itemId) },
      select: {
        characterInventory: {
          select: {
            character: { select: { userId: true } },
          },
        },
      },
    });

    const userId = item?.characterInventory?.character?.userId || null;

    if (req.user.id !== userId) {
      res.status(403).json({
        error: 'You do not have the required permissions to modify this item',
      });
      return;
    }
    return next();
  },
};

export default authentication;
