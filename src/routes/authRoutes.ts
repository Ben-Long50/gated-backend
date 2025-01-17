import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js';
import { sendAuthStatus } from '../passport/passport.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.post('/auth/signup', userController.createUser);

router.post(
  '/auth/signin',
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'local',
      { session: false },
      (err: Error, user: any, info: any) => {
        if (err || !user) {
          return res
            .status(400)
            .json({ message: info?.message || 'Login failed' });
        }
        req.user = {
          id: user.id,
        };
        return next();
      },
    )(req, res, next);
  },
  authentication.issueJwt,
  (req: Request, res: Response) => {
    res.cookie('token', req.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 8,
    });
    res.status(200).json({
      message: `Signed in as user ${req.user?.id}`,
    });
  },
);

router.post(
  '/auth/signout',
  authentication.authenticate,
  (_req: Request, res: Response) => {
    res.cookie('token', null);
    res.status(200).json({
      message: `You have been signed out`,
    });
  },
);

router.get('/auth/status', sendAuthStatus);

router.get('/auth/google', passport.authenticate('google'));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/failure',
  }),
  authentication.issueJwt,
  (req: Request, res: Response) => {
    res.cookie('token', req.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 8,
    });
    const redirectUrl = `${process.env.CLIENT_URL}/glam/codex`;
    res.redirect(redirectUrl);
  },
);

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/auth/failure',
  }),
  authentication.issueJwt,
  (req: Request, res: Response) => {
    res.cookie('token', req.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 8,
    });
    const redirectUrl = `${process.env.CLIENT_URL}/glam/codex`;
    res.redirect(redirectUrl);
  },
);

router.get('/auth/failure', (_req: Request, res: Response) => {
  const message = 'Email is already associated with another sign in option';
  const redirectUrl = `${process.env.CLIENT_URL}/signin?error=${message}&status=400`;
  res.redirect(redirectUrl);
});

export default router;
