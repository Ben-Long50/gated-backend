import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userServices from '../services/userServices.js';
import prisma from '../config/database.js';
import { PassportStatic } from 'passport';

const googleStrategy = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: `${process.env.API_URL}/auth/google/callback`,
        scope: ['profile', 'email'],
        state: false,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email =
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : null;

          if (!email) {
            throw new Error(
              'Could not find an email associated with this Google account',
            );
          }

          const [firstName, lastName] = profile.displayName.split(' ');
          const profilePicture =
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : null;

          let user;

          if (email) {
            user = await prisma.user.findUnique({
              where: { email },
            });
          }

          if (user) {
            if (user.googleId !== profile.id) {
              return done(null, false);
            }
          } else {
            const randomNumberArray = [] as number[];
            for (let i = 0; i < 8; i++) {
              randomNumberArray.push(Math.floor(Math.random() * 10));
            }
            const numberString = randomNumberArray.join('').toString();
            const username = firstName + numberString;

            const userData = {
              username,
              googleId: profile.id,
              firstName,
              lastName,
              email,
              profilePicture,
            };
            user = await userServices.createUser(userData);
          }

          return done(null, user as any);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

export default googleStrategy;
