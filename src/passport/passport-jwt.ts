import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import prisma from '../config/database.js';

const jwtStrategy = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (jwt_payload, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { id: jwt_payload.id },
          });

          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (err) {
          return done(err, false);
        }
      },
    ),
  );
};

export default jwtStrategy;
