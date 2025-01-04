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
const actionServices = {
    getActions: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const actions = yield prisma.action.findMany({
                orderBy: { name: 'asc' },
            });
            return actions;
        }
        catch (error) {
            throw new Error('Failed to fetch actions');
        }
    }),
    createAction: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newAction = yield prisma.action.upsert({
                where: { name: formData.name },
                update: {
                    name: formData.name,
                    description: formData.description,
                    costs: formData.costs,
                    attribute: formData.attribute,
                    skill: formData.skill,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                },
                create: {
                    name: formData.name,
                    description: formData.description,
                    costs: formData.costs,
                    attribute: formData.attribute,
                    skill: formData.skill,
                    actionType: formData.actionType,
                    actionSubtypes: formData.actionSubtypes,
                },
            });
            return newAction;
        }
        catch (error) {
            throw new Error('Failed to create or update action');
        }
    }),
    deleteActionByName: (actionName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.action.delete({
                where: {
                    name: actionName,
                },
            });
        }
        catch (error) {
            throw new Error(error.message || 'Failed to delete action');
        }
    }),
};
export default actionServices;