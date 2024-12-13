import prisma from '../config/database.js';

const userServices = {
  getAllUsers: async () => {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  },

  getUserById: async (id) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  },

  createUser: async (userData) => {
    try {
      const newUser = await prisma.user.create({
        data: userData,
      });
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  },
};

export default userServices;
