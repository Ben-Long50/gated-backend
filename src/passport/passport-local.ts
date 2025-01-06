import { Strategy as LocalStrategy } from 'passport-local';
import userServices from '../services/userServices.js';
import { PassportStatic } from 'passport';

const localStrategy = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (email, _password, done) => {
        try {
          const user = await userServices.getUserByEmail(email);
          return done(null, user as any);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default localStrategy;
