import { Strategy as FacebookStrategy } from 'passport-facebook';
import userServices from '../services/userServices.js';
import prisma from '../config/database.js';

const facebookStrategy = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: `${process.env.API_URL}/auth/facebook/callback`,
        profileFields: ['id', 'emails', 'name', 'picture'],
        scope: ['email'],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email =
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : null;

          const profilePicture =
            profile.photos && profile.photos[0]
              ? profile.photos[0].value
              : null;

          let user = await prisma.user.findUnique({
            where: { email },
          });
          if (user) {
            if (user.facebookId !== profile.id) {
              return done(null, false);
            }
          } else {
            const userData = {
              facebookId: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
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

export default facebookStrategy;
