import prisma from '../config/database.js';
const userServices = {
    getAllUsers: async (query, userId) => {
        try {
            if (!query)
                return [];
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
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch users');
        }
    },
    getUserByUsername: async (username) => {
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
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch user');
        }
    },
    getUserById: async (id) => {
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
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch user');
        }
    },
    getUserByEmail: async (email) => {
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
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch user');
        }
    },
    createUser: async (userData) => {
        try {
            const newUser = await prisma.user.create({
                data: userData,
            });
            return {
                id: newUser === null || newUser === void 0 ? void 0 : newUser.id,
                username: newUser === null || newUser === void 0 ? void 0 : newUser.username,
                firstName: newUser === null || newUser === void 0 ? void 0 : newUser.firstName,
                lastName: newUser === null || newUser === void 0 ? void 0 : newUser.lastName,
                role: newUser === null || newUser === void 0 ? void 0 : newUser.role,
                profilePicture: newUser === null || newUser === void 0 ? void 0 : newUser.profilePicture,
            };
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create user');
        }
    },
};
export default userServices;
