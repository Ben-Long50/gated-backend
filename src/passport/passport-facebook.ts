import { Strategy as FacebookStrategy } from 'passport-facebook';
import userServices from '../services/userServices.js';
import prisma from '../config/database.js';
import { PassportStatic } from 'passport';

const facebookStrategy = (passport: PassportStatic) => {
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

          if (!email) {
            throw new Error(
              'Could not find an email associated with this Facebook account',
            );
          }

          if (!profile?.name?.givenName || !profile.name.familyName) {
            throw new Error(
              'Could not find an email associated with this Facebook account',
            );
          }

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
            if (user.facebookId !== profile.id) {
              return done(null, false);
            }

            if (profilePicture && user.profilePicture !== profilePicture) {
              await prisma.user.update({
                where: { email },
                data: { profilePicture },
              });
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

          return done(null, user as any);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );
};

export default facebookStrategy;
