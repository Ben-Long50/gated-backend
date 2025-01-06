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

  authenticateUser: passport.authenticate('jwt', { session: false }),
};

export default authentication;
