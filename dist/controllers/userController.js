import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import userServices from '../services/userServices.js';
const userController = {
    getAuthenticatedUser: async (req, res) => {
        var _a, _b, _c, _d, _e;
        res.status(200).json({
            id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            firstName: (_b = req.user) === null || _b === void 0 ? void 0 : _b.firstName,
            lastName: (_c = req.user) === null || _c === void 0 ? void 0 : _c.lastName,
            role: (_d = req.user) === null || _d === void 0 ? void 0 : _d.role,
            profilePicture: (_e = req.user) === null || _e === void 0 ? void 0 : _e.profilePicture,
        });
    },
    getUsers: async (_req, res) => {
        try {
            const users = await userServices.getAllUsers();
            res.json(users);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await userServices.getUserById(req.params.id);
            if (!user) {
                res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json({
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
    },
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
            .custom(async (value) => {
            const user = await userServices.getUserByEmail(value);
            if (user) {
                throw new Error('An account with this email already exists');
            }
            return true;
        }),
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
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array() });
            }
            else {
                try {
                    const hashedPassword = await bcrypt.hash(req.body.password, 10);
                    const userData = {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hashedPassword,
                    };
                    await userServices.createUser(userData);
                    res.status(200).json({ message: 'Account creation successful' });
                }
                catch (error) {
                    if (error instanceof Error) {
                        res.status(500).json({ error: error.message });
                    }
                }
            }
        },
    ],
};
export default userController;
