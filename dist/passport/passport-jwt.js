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
    }, async (jwt_payload, done) => {
        try {
            const user = await prisma.user.findUnique({
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
    }));
};
export default jwtStrategy;
