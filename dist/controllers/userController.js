var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import userServices from '../services/userServices.js';
const userController = {
    getAuthenticatedUser: (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        res.status(200).json({
            id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            firstName: (_b = req.user) === null || _b === void 0 ? void 0 : _b.firstName,
            lastName: (_c = req.user) === null || _c === void 0 ? void 0 : _c.lastName,
            role: (_d = req.user) === null || _d === void 0 ? void 0 : _d.role,
            profilePicture: (_e = req.user) === null || _e === void 0 ? void 0 : _e.profilePicture,
        });
    }),
    getUsers: (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield userServices.getAllUsers();
            res.json(users);
        }
        catch (error) {
             if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
        }
    }),
    getUser: (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield userServices.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                profilePicture: user.profilePicture,
            });
        }
        catch (error) {
             if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
        }
    }),
    createUser: [
        body('firstName', 'First name must be a minimum of 2 characters')
            .trim()
            .isLength({ min: 2 })
            .escape(),
        body('lastName', 'Last name must be a minimum of 2 characters')
            .trim()
            .isLength({ min: 2 })
            .escape(),
        body('email')
            .trim()
            .escape()
            .notEmpty()
            .withMessage('The email field cannot be empty')
            .matches(/^[^s@]+@[^s@]+.[^s@]+$/)
            .withMessage('The email input must be in a valid email format')
            .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield userServices.getUserByEmail(value);
            if (user && user.facebookId) {
                throw new Error('An account with this email already exists using the Facebook sign in option');
            }
            else if (user && user.googleId) {
                throw new Error('An account with this email already exists using the Google sign in option');
            }
            else if (user) {
                throw new Error('An account with this email already exists');
            }
            return true;
        })),
        body('password', 'Password must be a minimum of 6 characters')
            .trim()
            .isLength({ min: 6 })
            .escape(),
        body('confirmPassword', 'Passwords must match')
            .trim()
            .escape()
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false;
            }
            return true;
        }),
        (req: Request, res: Response) => __awaiter(void 0, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            else {
                try {
                    const hashedPassword = yield bcrypt.hash(req.body.password, 10);
                    const userData = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hashedPassword,
                    };
                    yield userServices.createUser(userData);
                    res.status(200).json({ message: 'Account creation successful' });
                }
                catch (error) {
                     if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
                }
            }
        }),
    ],
};
export default userController;
