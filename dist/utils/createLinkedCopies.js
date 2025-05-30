import actionServices from '../services/actionServices.js';
import itemServices from '../services/itemServices.js';
export const createLinkedCopies = async (userId, itemReference, inventoryId, quantity) => {
    let itemIds = [];
    let actionIds = [];
    if (itemReference &&
        'items' in itemReference &&
        (itemReference === null || itemReference === void 0 ? void 0 : itemReference.items.length) > 0) {
        const modificationInfo = itemReference.items.map((item) => {
            return { itemId: item.id, price: 0, quantity };
        });
        itemIds = await itemServices.createCharacterItemCopy(userId, inventoryId, modificationInfo);
    }
    if (itemReference &&
        'actions' in itemReference &&
        (itemReference === null || itemReference === void 0 ? void 0 : itemReference.actions.length) > 0) {
        const actionInfo = itemReference.actions.map((action) => {
            return { actionId: action.id, quantity };
        });
        actionIds = await actionServices.createCharacterActionCopy(inventoryId, actionInfo);
    }
    return { itemIds, actionIds };
};
