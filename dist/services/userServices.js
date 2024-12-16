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
            return users;
        }
        catch (error) {
            throw new Error('Failed to fetch users');
        }
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { id: Number(id) },
            });
            return user;
        }
        catch (error) {
            throw new Error('Failed to fetch user');
        }
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { email },
            });
            return user;
        }
        catch (error) {
            throw new Error('Failed to fetch user');
        }
    }),
    createUser: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userData);
        try {
            const newUser = yield prisma.user.create({
                data: userData,
            });
            return newUser;
        }
        catch (error) {
            throw new Error('Failed to create user');
        }
    }),
};
export default userServices;
