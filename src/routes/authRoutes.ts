import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js';
import { sendAuthStatus } from '../passport/passport.js';
import authentication from '../middleware/authentication.js';

const router = express.Router();

router.post('/auth/signup', userController.createUser);

// router.post('/auth/signin', userController.authenticateUser, signin);

// router.post('/auth/signout', verifyAuthentication, signout);

router.get('/auth/status', sendAuthStatus);

router.get('/auth/google', passport.authenticate('google'));

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/failure',
  }),
  authentication.issueJwt,
  (req, res) => {
    res.cookie('token', req.token, {
      maxAge: 1000 * 60 * 60 * 8,
    });
    const redirectUrl = `${process.env.CLIENT_URL}/home`;
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
  (req, res) => {
    res.cookie('token', req.token, {
      maxAge: 1000 * 60 * 60 * 8,
    });
    const redirectUrl = `${process.env.CLIENT_URL}/home`;
    res.redirect(redirectUrl);
  },
);

router.get('/auth/failure', (req, res) => {
  const message = 'Email is already associated with another sign in option';
  const redirectUrl = `${process.env.CLIENT_URL}/signin?error=${message}&status=400`;
  res.redirect(redirectUrl);
});

export default router;
