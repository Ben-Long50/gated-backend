import prisma from '../config/database.js';

const userServices = {
  getAllUsers: async () => {
    try {
      const users = await prisma.user.findMany();
      const userArray = users.map((user) => {
        return {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          role: user?.role,
          profilePicture: user?.profilePicture,
        };
      });
      return userArray;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch users');
    }
  },

  getUserById: async (id: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      return {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        role: user?.role,
        profilePicture: user?.profilePicture,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user');
    }
  },

  getUserByEmail: async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        return {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          role: user?.role,
          profilePicture: user?.profilePicture,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user');
    }
  },

  createUser: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    try {
      const newUser = await prisma.user.create({
        data: userData,
      });
      return {
        id: newUser?.id,
        firstName: newUser?.firstName,
        lastName: newUser?.lastName,
        role: newUser?.role,
        profilePicture: newUser?.profilePicture,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create user');
    }
  },
};

export default userServices;
