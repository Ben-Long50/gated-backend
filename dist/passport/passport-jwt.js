var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Strategy as JwtStrategy } from 'passport-jwt';
import prisma from '../config/database.js';
const cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};
const jwtStrategy = (passport) => {
    passport.use(new JwtStrategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: cookieExtractor,
    }, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { id: jwt_payload.id },
            });
            if (!user) {
                return done(null, false);
            }
            else {
                return done(null, user);
            }
        }
        catch (err) {
            return done(err, false);
        }
    })));
};
export default jwtStrategy;
