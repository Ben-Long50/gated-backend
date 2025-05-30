import actionServices from '../services/actionServices.js';
import itemServices from '../services/itemServices.js';
import { LinkReferencePlaylaod } from '../types/linkReferencePayloads';

export const createLinkedCopies = async (
  userId: number,
  itemReference: LinkReferencePlaylaod,
  inventoryId: number,
  quantity: number,
) => {
  let itemIds = [] as number[];
  let actionIds = [] as number[];

  if (
    itemReference &&
    'items' in itemReference &&
    itemReference?.items.length > 0
  ) {
    const modificationInfo = itemReference.items.map((item) => {
      return { itemId: item.id, price: 0, quantity };
    });
    itemIds = await itemServices.createCharacterItemCopy(
      userId,
      inventoryId,
      modificationInfo,
    );
  }

  if (
    itemReference &&
    'actions' in itemReference &&
    itemReference?.actions.length > 0
  ) {
    const actionInfo = itemReference.actions.map((action) => {
      return { actionId: action.id, quantity };
    });
    actionIds = await actionServices.createCharacterActionCopy(
      inventoryId,
      actionInfo,
    );
  }

  return { itemIds, actionIds };
};
