import express from 'express';
import passport from 'passport';
import userController from '../controllers/userController.js';
import { sendAuthStatus } from '../passport/passport.js';
import authentication from '../middleware/authentication.js';
const router = express.Router();
router.post('/auth/signup', userController.createUser);
router.post('/auth/signin', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res
                .status(400)
                .json({ message: (info === null || info === void 0 ? void 0 : info.message) || 'Login failed' });
        }
        req.user = {
            id: user.id,
        };
        return next();
    })(req, res, next);
}, authentication.issueJwt, (req, res) => {
    var _a;
    res.cookie('token', req.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 8,
    });
    res.status(200).json({
        message: `Signed in as user ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.id}`,
    });
});
router.post('/auth/signout', authentication.authenticateUser, (_req, res) => {
    res.cookie('token', null);
    res.status(200).json({
        message: `You have been signed out`,
    });
});
router.get('/auth/status', sendAuthStatus);
router.get('/auth/google', passport.authenticate('google'));
router.get('/auth/google/callback', passport.authenticate('google', {
    session: false,
    failureRedirect: '/auth/failure',
}), authentication.issueJwt, (req, res) => {
    res.cookie('token', req.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 8,
    });
    const redirectUrl = `${process.env.CLIENT_URL}/glam/codex/book/introduction`;
    res.redirect(redirectUrl);
});
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/auth/failure',
}), authentication.issueJwt, (req, res) => {
    res.cookie('token', req.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 8,
    });
    const redirectUrl = `${process.env.CLIENT_URL}/glam/codex/book/introduction`;
    res.redirect(redirectUrl);
});
router.get('/auth/failure', (_req, res) => {
    const message = 'Email is already associated with another sign in option';
    const redirectUrl = `${process.env.CLIENT_URL}/signin?error=${message}&status=400`;
    res.redirect(redirectUrl);
});
export default router;
