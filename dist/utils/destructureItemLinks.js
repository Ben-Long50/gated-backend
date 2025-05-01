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
export const destructureLinkReference = (item) => {
    if ('weaponLinkReference' in item) {
        const _a = Object.assign({}, item), { weaponLinkReference } = _a, weaponData = __rest(_a, ["weaponLinkReference"]);
        return Object.assign({ weapons: weaponLinkReference === null || weaponLinkReference === void 0 ? void 0 : weaponLinkReference.weapons, armor: weaponLinkReference === null || weaponLinkReference === void 0 ? void 0 : weaponLinkReference.armors, cybernetics: weaponLinkReference === null || weaponLinkReference === void 0 ? void 0 : weaponLinkReference.cybernetics, actions: weaponLinkReference === null || weaponLinkReference === void 0 ? void 0 : weaponLinkReference.actions }, weaponData);
    }
    else if ('armorLinkReference' in item) {
        const _b = Object.assign({}, item), { armorLinkReference } = _b, weaponData = __rest(_b, ["armorLinkReference"]);
        return Object.assign({ weapons: armorLinkReference === null || armorLinkReference === void 0 ? void 0 : armorLinkReference.weapons, armor: armorLinkReference === null || armorLinkReference === void 0 ? void 0 : armorLinkReference.armors, cybernetics: armorLinkReference === null || armorLinkReference === void 0 ? void 0 : armorLinkReference.cybernetics, actions: armorLinkReference === null || armorLinkReference === void 0 ? void 0 : armorLinkReference.actions }, weaponData);
    }
    else if ('cyberneticLinkReference' in item) {
        const _c = Object.assign({}, item), { cyberneticLinkReference } = _c, cyberneticData = __rest(_c, ["cyberneticLinkReference"]);
        return Object.assign({ weapons: cyberneticLinkReference === null || cyberneticLinkReference === void 0 ? void 0 : cyberneticLinkReference.weapons, armor: cyberneticLinkReference === null || cyberneticLinkReference === void 0 ? void 0 : cyberneticLinkReference.armors, cybernetics: cyberneticLinkReference === null || cyberneticLinkReference === void 0 ? void 0 : cyberneticLinkReference.cybernetics, actions: cyberneticLinkReference === null || cyberneticLinkReference === void 0 ? void 0 : cyberneticLinkReference.actions }, cyberneticData);
    }
    else if ('vehicleLinkReference' in item) {
        const _d = Object.assign({}, item), { vehicleLinkReference } = _d, vehicleData = __rest(_d, ["vehicleLinkReference"]);
        return Object.assign({ weapons: vehicleLinkReference === null || vehicleLinkReference === void 0 ? void 0 : vehicleLinkReference.weapons, armor: vehicleLinkReference === null || vehicleLinkReference === void 0 ? void 0 : vehicleLinkReference.armors, modifications: vehicleLinkReference === null || vehicleLinkReference === void 0 ? void 0 : vehicleLinkReference.modifications, actions: vehicleLinkReference === null || vehicleLinkReference === void 0 ? void 0 : vehicleLinkReference.actions }, vehicleData);
    }
    else if ('modificationLinkReference' in item) {
        const _e = Object.assign({}, item), { modificationLinkReference } = _e, modificationData = __rest(_e, ["modificationLinkReference"]);
        return Object.assign({ actions: modificationLinkReference === null || modificationLinkReference === void 0 ? void 0 : modificationLinkReference.actions }, modificationData);
    }
    else if ('itemLinkReference' in item) {
        const _f = Object.assign({}, item), { itemLinkReference } = _f, itemData = __rest(_f, ["itemLinkReference"]);
        return Object.assign({ actions: itemLinkReference === null || itemLinkReference === void 0 ? void 0 : itemLinkReference.actions }, itemData);
    }
    return;
};
