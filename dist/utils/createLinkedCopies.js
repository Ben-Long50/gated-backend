import actionServices from '../services/actionServices.js';
import armorServices from '../services/armorServices.js';
import cyberneticServices from '../services/cyberneticServices.js';
import modificationServices from '../services/modificationServices.js';
import weaponServices from '../services/weaponServices.js';
export const createLinkedCopies = async (itemReference, inventoryId, quantity) => {
    let weaponIds = [];
    let armorIds = [];
    let cyberneticIds = [];
    let actionIds = [];
    let modificationIds = [];
    if (itemReference &&
        'weapons' in itemReference &&
        (itemReference === null || itemReference === void 0 ? void 0 : itemReference.weapons.length) > 0) {
        const weaponInfo = itemReference.weapons.map((weapon) => {
            return { weaponId: weapon.id, price: 0, quantity };
        });
        weaponIds = await weaponServices.createCharacterWeaponCopy(inventoryId, weaponInfo);
    }
    if (itemReference &&
        'armors' in itemReference &&
        (itemReference === null || itemReference === void 0 ? void 0 : itemReference.armors.length) > 0) {
        const armorInfo = itemReference.armors.map((armor) => {
            return { armorId: armor.id, price: 0, quantity };
        });
        armorIds = await armorServices.createCharacterArmorCopy(inventoryId, armorInfo);
    }
    if (itemReference &&
        'cybernetics' in itemReference &&
        (itemReference === null || itemReference === void 0 ? void 0 : itemReference.cybernetics.length) > 0) {
        const cyberneticInfo = itemReference.cybernetics.map((cybernetic) => {
            return { cyberneticId: cybernetic.id, price: 0, quantity };
        });
        cyberneticIds = await cyberneticServices.createCharacterCyberneticCopy(inventoryId, cyberneticInfo);
    }
    if (itemReference &&
        'actions' in itemReference &&
        (itemReference === null || itemReference === void 0 ? void 0 : itemReference.actions.length) > 0) {
        const actionInfo = itemReference.actions.map((action) => {
            return { actionId: action.id, quantity };
        });
        actionIds = await actionServices.createCharacterActionCopy(inventoryId, actionInfo);
    }
    if (itemReference &&
        'modifications' in itemReference &&
        (itemReference === null || itemReference === void 0 ? void 0 : itemReference.modifications.length) > 0) {
        const modificationInfo = itemReference.modifications.map((modification) => {
            return { modificationId: modification.id, price: 0, quantity };
        });
        actionIds = await modificationServices.createCharacterModificationCopy(inventoryId, modificationInfo);
    }
    return { weaponIds, armorIds, cyberneticIds, actionIds, modificationIds };
};
