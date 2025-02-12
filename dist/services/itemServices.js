var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import prisma from '../config/database.js';
import actionServices from './actionServices.js';
const itemServices = {
    getItems: async () => {
        try {
            const items = await prisma.item.findMany({
                where: { characterInventory: null },
                include: { actions: true },
                orderBy: { name: 'asc' },
            });
            return items;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch items');
        }
    },
    getItemById: async (itemId) => {
        try {
            const item = await prisma.item.findUnique({
                where: { id: Number(itemId) },
                include: { actions: true },
            });
            return item;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to fetch item');
        }
    },
    createOrUpdateItem: async (formData) => {
        try {
            const oldItem = (await prisma.item.findUnique({
                where: { id: formData.id },
                select: {
                    actions: { select: { id: true } },
                },
            })) || undefined;
            const oldItemIds = oldItem === null || oldItem === void 0 ? void 0 : oldItem.actions.map((action) => action.id);
            const newItemIds = formData.actions.map((action) => action.id);
            const actionsToDelete = (oldItemIds === null || oldItemIds === void 0 ? void 0 : oldItemIds.filter((id) => !newItemIds.includes(id))) || [];
            if (actionsToDelete.length > 0) {
                await actionServices.deleteActions(actionsToDelete);
            }
            const actionIds = await Promise.all(formData.actions.map(async (action) => {
                const newAction = await actionServices.createAction(action);
                return { id: newAction.id };
            }));
            const getPictureInfo = () => {
                if (formData.publicId) {
                    return { publicId: formData.publicId, imageUrl: formData.imageUrl };
                }
                else {
                    return formData.picture;
                }
            };
            const pictureInfo = getPictureInfo();
            const { id, publicId, imageUrl, picture } = formData, itemData = __rest(formData, ["id", "publicId", "imageUrl", "picture"]);
            const item = await prisma.item.upsert({
                where: { id: formData.id },
                update: Object.assign(Object.assign({}, itemData), { picture: pictureInfo, actions: {
                        connect: actionIds,
                    } }),
                create: Object.assign(Object.assign({}, itemData), { picture: pictureInfo, actions: {
                        connect: actionIds,
                    } }),
            });
            return item;
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to create or update item');
        }
    },
    deleteItem: async (itemId) => {
        try {
            await prisma.item.delete({
                where: {
                    id: Number(itemId),
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete item');
        }
    },
    deleteItems: async (itemIds) => {
        try {
            await prisma.item.deleteMany({
                where: {
                    id: { in: itemIds },
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new Error('Failed to delete items');
        }
    },
};
export default itemServices;
