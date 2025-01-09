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
            console.error(error);
            throw new Error('Failed to fetch actions');
        }
    }),
    getActionById: (actionId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const action = yield prisma.action.findUnique({
                where: { id: Number(actionId) },
            });
            return action;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch action');
        }
    }),
    createAction: (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newAction = yield prisma.action.upsert({
                where: { id: Number(formData.actionId) || 0 },
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
            console.error(error);
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
            console.error(error);
            throw new Error('Failed to delete action');
        }
    }),
    deleteAction: (actionId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma.action.delete({
                where: {
                    id: Number(actionId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete action');
        }
    }),
};
export default actionServices;
