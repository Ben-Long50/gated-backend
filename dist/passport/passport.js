import passport from 'passport';
import userServices from '../services/userServices.js';
import googleStrategy from './passport-google.js';
import facebookStrategy from './passport-facebook.js';
import localStrategy from './passport-local.js';
import jwtStrategy from './passport-jwt.js';
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await userServices.getUserById(id);
        if (!user) {
            throw new Error('Deserialization failed. Could not find user');
        }
        done(null, user);
    }
    catch (err) {
        done(err);
    }
});
googleStrategy(passport);
facebookStrategy(passport);
localStrategy(passport);
jwtStrategy(passport);
export const sendAuthStatus = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            message: 'Successfully Authenticated',
        });
    }
    else {
        res.status(401).json({ message: 'Authentication missing or expired' });
    }
};
export default passport;
