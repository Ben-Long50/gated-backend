import actionServices from '../services/actionServices.js';
import armorServices from '../services/armorServices.js';
import cyberneticServices from '../services/cyberneticServices.js';
import modificationServices from '../services/modificationServices.js';
import weaponServices from '../services/weaponServices.js';
import { LinkReferencePlaylaods } from '../types/linkReferencePayloads';

export const createLinkedCopies = async (
  itemReference: LinkReferencePlaylaods,
  inventoryId: string,
  quantity: number,
) => {
  let weaponIds = [] as number[];
  let armorIds = [] as number[];
  let cyberneticIds = [] as number[];
  let actionIds = [] as number[];
  let modificationIds = [] as number[];

  if (
    itemReference &&
    'weapons' in itemReference &&
    itemReference?.weapons.length > 0
  ) {
    const weaponInfo = itemReference.weapons.map((weapon) => {
      return { weaponId: weapon.id, price: 0, quantity };
    });
    weaponIds = await weaponServices.createCharacterWeaponCopy(
      inventoryId,
      weaponInfo,
    );
  }

  if (
    itemReference &&
    'armors' in itemReference &&
    itemReference?.armors.length > 0
  ) {
    const armorInfo = itemReference.armors.map((armor) => {
      return { armorId: armor.id, price: 0, quantity };
    });
    armorIds = await armorServices.createCharacterArmorCopy(
      inventoryId,
      armorInfo,
    );
  }

  if (
    itemReference &&
    'cybernetics' in itemReference &&
    itemReference?.cybernetics.length > 0
  ) {
    const cyberneticInfo = itemReference.cybernetics.map((cybernetic) => {
      return { cyberneticId: cybernetic.id, price: 0, quantity };
    });
    cyberneticIds = await cyberneticServices.createCharacterCyberneticCopy(
      inventoryId,
      cyberneticInfo,
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

  if (
    itemReference &&
    'modifications' in itemReference &&
    itemReference?.modifications.length > 0
  ) {
    const modificationInfo = itemReference.modifications.map((modification) => {
      return { modificationId: modification.id, price: 0, quantity };
    });
    actionIds = await modificationServices.createCharacterModificationCopy(
      inventoryId,
      modificationInfo,
    );
  }

  return { weaponIds, armorIds, cyberneticIds, actionIds, modificationIds };
};
