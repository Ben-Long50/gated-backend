import prisma from '../config/database.js';
const userServices = {
    getAllUsers: async (query, userId) => {
        try {
            if (!query)
                return [];
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
                    id: user === null || user === void 0 ? void 0 : user.id,
                    firstName: user === null || user === void 0 ? void 0 : user.firstName,
                    lastName: user === null || user === void 0 ? void 0 : user.lastName,
                    role: user === null || user === void 0 ? void 0 : user.role,
                    profilePicture: user === null || user === void 0 ? void 0 : user.profilePicture,
                };
            });
            return userArray;
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
