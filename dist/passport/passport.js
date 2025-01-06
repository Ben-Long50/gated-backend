var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import passport from 'passport';
import userServices from '../services/userServices.js';
import googleStrategy from './passport-google.js';
import facebookStrategy from './passport-facebook.js';
import localStrategy from './passport-local.js';
import jwtStrategy from './passport-jwt.js';
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userServices.getUserById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
googleStrategy(passport);
facebookStrategy(passport);
localStrategy(passport);
jwtStrategy(passport);
export const sendAuthStatus = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
        res.status(200).json({
            message: `Authenticated as user ${req.user.firstName} ${req.user.lastName}`,
        });
    }
    else {
        res.status(401).json({ message: 'Authentication missing or expired' });
    }
};
export default passport;
