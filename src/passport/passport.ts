import passport from 'passport';
import userServices from '../services/userServices.js';
import googleStrategy from './passport-google.js';
import facebookStrategy from './passport-facebook.js';
import { Request, Response } from 'express';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userServices.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

googleStrategy(passport);
facebookStrategy(passport);

export const sendAuthStatus = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.status(200).json({
      message: `Authenticated as user ${req.user.firstName} ${req.user.lastName}`,
    });
  } else {
    res.status(401).json({ message: 'Authentication missing or expired' });
  }
};

export default passport;
