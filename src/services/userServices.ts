import prisma from '../config/database.js';

const userServices = {
  getAllUsers: async (query: string, userId: number) => {
    try {
      if (!query) return [];
      const users = await prisma.user.findMany({
        where: {
          id: { not: userId },
          username: {
            contains: query,
            mode: 'insensitive',
          },
        },
        select: { id: true, username: true, profilePicture: true },
        take: 10,
      });

      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch users');
    }
  },

  getUserByUsername: async (username: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          profilePicture: true,
          _count: {
            select: {
              receivedNotifications: { where: { read: false } },
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user');
    }
  },

  getUserById: async (id: number) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          profilePicture: true,
          _count: {
            select: {
              receivedNotifications: { where: { read: false } },
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user');
    }
  },

  getUserByEmail: async (email: string) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          username: true,
          id: true,
          firstName: true,
          lastName: true,
          role: true,
          profilePicture: true,
          _count: {
            select: {
              receivedNotifications: { where: { read: false } },
            },
          },
        },
      });
      return user;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch user');
    }
  },

  createUser: async (userData: {
    username: string;
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
        username: newUser?.username,
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
