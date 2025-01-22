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
const conditionServices = {
    getConditions: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const conditions = yield prisma.condition.findMany({
                orderBy: { name: 'asc' },
            });
            return conditions;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch conditions');
        }
    }),
    getConditionById: (conditionId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const condition = yield prisma.condition.findUnique({
                where: { id: Number(conditionId) },
            });
            return condition;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch condition');
        }
    }),
    createCondition: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newCondition = yield prisma.condition.upsert({
                where: { id: Number(formData.conditionId) || 0 },
                update: {
                    name: formData.name,
                    description: formData.description,
                    conditionType: formData.type,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    conditionType: formData.type,
                },
            });
            return newCondition;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update condition');
        }
    }),
    deleteCondition: (conditionId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.condition.delete({
                where: {
                    id: Number(conditionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete condition');
        }
    }),
};
export default conditionServices;
