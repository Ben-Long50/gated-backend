import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

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
          }
          req.token = token;
          next();
        },
      );
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  authenticate: passport.authenticate('jwt', { session: false }),

  authenticateSuperadmin: (req: Request, res: Response, next: NextFunction) => {
    const allowedRoles = ['SUPERADMIN'];
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
    } else if (req.user.role && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'You do not have the correct permissions to use this function',
      });
    }
    return next();
  },

  authenticateAdmin: (req: Request, res: Response, next: NextFunction) => {
    const allowedRoles = ['SUPERADMIN', 'ADMIN'];
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
    } else if (req.user.role && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'You do not have the correct permissions to use this function',
      });
    }
    return next();
  },

  authenticateUser: (req: Request, res: Response, next: NextFunction) => {
    const allowedRoles = ['SUPERADMIN', 'ADMIN', 'USER'];
    if (!req.user) {
      res.status(401).json({ error: 'No user found' });
    } else if (req.user.role && !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        error: 'You do not have the correct permissions to use this function',
      });
    }
    return next();
  },
};

export default authentication;
