var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userServices from '../services/userServices.js';
import prisma from '../config/database.js';
const googleStrategy = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: `${process.env.API_URL}/auth/google/callback`,
        scope: ['profile', 'email'],
        state: false,
    }, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const email = profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : null;
            if (!email) {
                throw new Error('Could not find an email associated with this Google account');
            }
            const [firstName, lastName] = profile.displayName.split(' ');
            const profilePicture = profile.photos && profile.photos[0]
                ? profile.photos[0].value
                : null;
            let user;
            if (email) {
                user = yield prisma.user.findUnique({
                    where: { email },
                });
            }
            if (user) {
                if (user.googleId !== profile.id) {
                    return done(null, false);
                }
            }
            else {
                const userData = {
                    googleId: profile.id,
                    firstName,
                    lastName,
                    email,
                    profilePicture,
                };
                user = yield userServices.createUser(userData);
            }
            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    })));
};
export default googleStrategy;
