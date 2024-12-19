var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Strategy as LocalStrategy } from 'passport-local';
import userServices from '../services/userServices.js';
const localStrategy = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
    }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userServices.getUserByEmail(email);
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    })));
};
export default localStrategy;
