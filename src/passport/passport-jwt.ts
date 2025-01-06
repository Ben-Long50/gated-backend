import { Strategy as JwtStrategy } from 'passport-jwt';
import prisma from '../config/database.js';
import { PassportStatic } from 'passport';
import { Request } from 'express';

const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  return token;
};

const jwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: cookieExtractor,
      },
      async (jwt_payload, done) => {
        try {
          console.log(jwt_payload);

          const user = await prisma.user.findUnique({
            where: { id: jwt_payload.id },
          });

          if (!user) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err, false);
        }
      },
    ),
  );
};

export default jwtStrategy;
