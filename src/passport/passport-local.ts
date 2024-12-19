import { Strategy as LocalStrategy } from 'passport-local';
import userServices from '../services/userServices.js';

const localStrategy = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (email, password, done) => {
        try {
          const user = await userServices.getUserByEmail(email);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default localStrategy;
