import { read } from 'fs';
import prisma from '../config/database.js';

const userServices = {
  getAllUsers: async (query: string, userId: number) => {
    try {
      if (!query) return [];
      const users = await prisma.user.findMany({
        where: {
          id: { not: userId },
          OR: [
            {
              firstName: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        take: 10,
      });
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
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
          profilePicture: true,
          _count: {
            select: {
              receivedNotifications: { where: { read: false } },
              ownerCampaigns: true,
              playerCampaigns: true,
              pendingCampaigns: true,
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
      if (user) {
        return {
          id: user?.id,
          firstName: user?.firstName,
          lastName: user?.lastName,
          role: user?.role,
          profilePicture: user?.profilePicture,
          receivedNotifications: user?._count,
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
