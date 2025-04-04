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
    getUserById: async (id) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
            });
            return {
                id: user === null || user === void 0 ? void 0 : user.id,
                firstName: user === null || user === void 0 ? void 0 : user.firstName,
                lastName: user === null || user === void 0 ? void 0 : user.lastName,
                role: user === null || user === void 0 ? void 0 : user.role,
                profilePicture: user === null || user === void 0 ? void 0 : user.profilePicture,
            };
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
            });
            if (user) {
                return {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    firstName: user === null || user === void 0 ? void 0 : user.firstName,
                    lastName: user === null || user === void 0 ? void 0 : user.lastName,
                    role: user === null || user === void 0 ? void 0 : user.role,
                    profilePicture: user === null || user === void 0 ? void 0 : user.profilePicture,
                };
            }
            else {
                return null;
            }
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
