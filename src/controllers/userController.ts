import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import userServices from '../services/userServices.js';

const userController = {
  getAuthenticatedUser: async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ error: 'User could not be authenticated' });
      return;
    }

    const user = await userServices.getUserById(req.user?.id);
    res.status(200).json(user);
  },

  getUsers: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res
          .status(401)
          .json({ error: 'You must be signed in to search users' });
        return;
      }
      const query = req.query.nameQuery as string;
      const userId = req.user.id;

      const users = await userServices.getAllUsers(query, userId);
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const user = await userServices.getUserById(Number(req.params.id));
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(200).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        profilePicture: user.profilePicture,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },

  createUser: [
    body('username', 'Username must be a minimum of 4 characters')
      .trim()
      .isLength({ min: 4 })
      .escape()
      .custom(async (value) => {
        const user = await userServices.getUserByUsername(value);
        if (user) {
          throw new Error('An account with this username already exists');
        }
        return true;
      }),
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
    body('password', 'Password must be a minimum of 8 characters')
      .trim()
      .isLength({ min: 8 })
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

    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errors);
      } else {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const userData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
          };
          await userServices.createUser(userData);

          res.status(200).json({ message: 'Account creation successful' });
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).json({ error: error.message });
          }
        }
      }
    },
  ],

  updateUser: [
    body('username', 'Username must be a minimum of 4 characters')
      .trim()
      .isLength({ min: 4 })
      .escape()
      .custom(async (value, { req }) => {
        const user = await userServices.getUserByUsername(value);
        if (user && user.id !== req.user.id) {
          throw new Error(
            'This username is already associated with another account',
          );
        }
        return true;
      }),
    body('firstName', 'First name must be a minimum of 2 characters')
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body('lastName', 'Last name must be a minimum of 2 characters')
      .trim()
      .isLength({ min: 2 })
      .escape(),
    body('email', 'The email input must be in a valid email format')
      .trim()
      .escape()
      .matches(/^[^s@]+@[^s@]+.[^s@]+$/)
      .custom(async (value, { req }) => {
        if (value !== req.user.email && req.user.facebookId) {
          throw new Error(
            'You cannot change your email when using an account linked to Facebook',
          );
        }
        if (value !== req.user.email && req.user.googleId) {
          throw new Error(
            'You cannot change your email when using an account linked to Google',
          );
        }
        const user = await userServices.getUserByEmail(value);
        if (user && user.id !== req.user.id) {
          throw new Error(
            'This email is already associated with another account',
          );
        }
        return true;
      }),

    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errors);
      } else {
        if (!req.user) {
          throw new Error('You must be signed in to complete this action');
        }

        try {
          const userData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
          };

          await userServices.updateUser(userData, req.user.id);

          res
            .status(200)
            .json({ message: 'Successfully updated account information' });
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).json({ error: error.message });
          }
        }
      }
    },
  ],

  updateUserRole: async (req: Request, res: Response) => {
    try {
      await userServices.updateUser(
        { role: req.body.role },
        Number(req.params.userId),
      );

      res
        .status(200)
        .json({ message: 'Successfully updated account information' });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
    }
  },
};

export default userController;
