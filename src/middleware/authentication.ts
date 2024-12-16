import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import prisma from '../config/database.js'; // Assuming you are using Prisma for database access

const verifyToken = promisify(jwt.verify);

const authentication = {
  issueJwt: (req, res, next) => {
    try {
      jwt.sign(
        { id: req.user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: '8h',
        },
        (err, token) => {
          if (err) {
            res.status(500).json({ message: 'Error generating token' });
          }
          req.token = token;
          next();
        },
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  authenticateUser: async (req, res, next) => {
    try {
      // Get the token from the authorization header
      const token =
        req.headers.authorization && req.headers.authorization.split(' ')[1];
      console.log(token);

      if (!token) {
        return res
          .status(401)
          .json({ error: 'Access denied. No token provided.' });
      }

      // Verify the token
      const decoded = await verifyToken(token, process.env.JWT_SECRET);

      // Find the user by the ID encoded in the token
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res
          .status(401)
          .json({ error: 'Access denied. User not found.' });
      }

      // Attach the user to the request object
      req.user = user;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid token.' });
    }
  },
};

export default authentication;
