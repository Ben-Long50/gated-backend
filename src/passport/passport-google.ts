import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userServices from '../services/userServices.js';
import prisma from '../config/database.js';

const googleStrategy = (passport) => {
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
          const [firstName, lastName] = profile.displayName.split(' ');
          const profilePicture =
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : null;

          let user = await prisma.user.findUnique({
            where: { email },
          });
          if (user) {
            if (user.googleId !== profile.id) {
              return done(null, false);
            }
          } else {
            const userData = {
              googleId: profile.id,
              firstName,
              lastName,
              email,
              profilePicture,
            };
            user = await userServices.createUser(userData);
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

export default googleStrategy;
