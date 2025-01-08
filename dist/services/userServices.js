var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import prisma from '../config/database.js';
const userServices = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany();
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
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
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
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
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
    }),
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newUser = yield prisma.user.create({
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
    }),
};
export default userServices;
