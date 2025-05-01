import prisma from '../config/database.js';
export const enforceSingularLinking = async (parentId, weaponIds, armorIds, cyberneticIds, actionIds, modificationIds) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const linkedItems = [];
    for (let id of weaponIds || []) {
        const weapon = await prisma.weapon.findUnique({
            where: { id },
            select: {
                name: true,
                weaponLink: {
                    select: { weapon: { select: { id: true, name: true } } },
                },
                armorLink: { select: { armor: { select: { id: true, name: true } } } },
                cyberneticLink: {
                    select: { cybernetic: { select: { id: true, name: true } } },
                },
                vehicleLink: {
                    select: { vehicle: { select: { id: true, name: true } } },
                },
            },
        });
        if (!weapon) {
            continue;
        }
        const linkedIds = [
            (_a = weapon === null || weapon === void 0 ? void 0 : weapon.weaponLink) === null || _a === void 0 ? void 0 : _a.weapon,
            (_b = weapon === null || weapon === void 0 ? void 0 : weapon.armorLink) === null || _b === void 0 ? void 0 : _b.armor,
            (_c = weapon === null || weapon === void 0 ? void 0 : weapon.cyberneticLink) === null || _c === void 0 ? void 0 : _c.cybernetic,
            (_d = weapon === null || weapon === void 0 ? void 0 : weapon.vehicleLink) === null || _d === void 0 ? void 0 : _d.vehicle,
        ].filter((id) => id);
        linkedIds.forEach((relation) => {
            if (relation && relation.id !== parentId) {
                linkedItems.push(`${weapon.name} linked to ${relation.name}`);
            }
        });
    }
    for (let id of armorIds || []) {
        const armor = await prisma.armor.findUnique({
            where: { id },
            select: {
                name: true,
                weaponLink: {
                    select: { weapon: { select: { id: true, name: true } } },
                },
                armorLink: { select: { armor: { select: { id: true, name: true } } } },
                cyberneticLink: {
                    select: { cybernetic: { select: { id: true, name: true } } },
                },
                vehicleLink: {
                    select: { vehicle: { select: { id: true, name: true } } },
                },
            },
        });
        if (!armor) {
            continue;
        }
        const linkedIds = [
            (_e = armor === null || armor === void 0 ? void 0 : armor.weaponLink) === null || _e === void 0 ? void 0 : _e.weapon,
            (_f = armor === null || armor === void 0 ? void 0 : armor.armorLink) === null || _f === void 0 ? void 0 : _f.armor,
            (_g = armor === null || armor === void 0 ? void 0 : armor.cyberneticLink) === null || _g === void 0 ? void 0 : _g.cybernetic,
            (_h = armor === null || armor === void 0 ? void 0 : armor.vehicleLink) === null || _h === void 0 ? void 0 : _h.vehicle,
        ].filter((id) => id);
        linkedIds.forEach((relation) => {
            if (relation && relation.id !== parentId) {
                linkedItems.push(`${armor.name} linked to ${relation.name}`);
            }
        });
    }
    for (let id of cyberneticIds || []) {
        const cybernetic = await prisma.cybernetic.findUnique({
            where: { id },
            select: {
                name: true,
                weaponLink: {
                    select: { weapon: { select: { id: true, name: true } } },
                },
                armorLink: { select: { armor: { select: { id: true, name: true } } } },
                cyberneticLink: {
                    select: { cybernetic: { select: { id: true, name: true } } },
                },
            },
        });
        if (!cybernetic) {
            continue;
        }
        const linkedIds = [
            (_j = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.weaponLink) === null || _j === void 0 ? void 0 : _j.weapon,
            (_k = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.armorLink) === null || _k === void 0 ? void 0 : _k.armor,
            (_l = cybernetic === null || cybernetic === void 0 ? void 0 : cybernetic.cyberneticLink) === null || _l === void 0 ? void 0 : _l.cybernetic,
        ].filter((id) => id);
        linkedIds.forEach((relation) => {
            if (relation && relation.id !== parentId) {
                linkedItems.push(`${cybernetic.name} linked to ${relation.name}`);
            }
        });
    }
    for (let id of actionIds || []) {
        const action = await prisma.action.findUnique({
            where: { id },
            select: {
                name: true,
                weaponLink: {
                    select: { weapon: { select: { id: true, name: true } } },
                },
                armorLink: { select: { armor: { select: { id: true, name: true } } } },
                cyberneticLink: {
                    select: { cybernetic: { select: { id: true, name: true } } },
                },
                vehicleLink: {
                    select: { vehicle: { select: { id: true, name: true } } },
                },
                modificationLink: {
                    select: { modification: { select: { id: true, name: true } } },
                },
            },
        });
        if (!action) {
            continue;
        }
        const linkedIds = [
            (_m = action === null || action === void 0 ? void 0 : action.weaponLink) === null || _m === void 0 ? void 0 : _m.weapon,
            (_o = action === null || action === void 0 ? void 0 : action.armorLink) === null || _o === void 0 ? void 0 : _o.armor,
            (_p = action === null || action === void 0 ? void 0 : action.cyberneticLink) === null || _p === void 0 ? void 0 : _p.cybernetic,
            (_q = action === null || action === void 0 ? void 0 : action.vehicleLink) === null || _q === void 0 ? void 0 : _q.vehicle,
            (_r = action === null || action === void 0 ? void 0 : action.modificationLink) === null || _r === void 0 ? void 0 : _r.modification,
        ].filter((id) => id);
        linkedIds.forEach((relation) => {
            if (relation && relation.id !== parentId) {
                linkedItems.push(`${action.name} linked to ${relation.name}`);
            }
        });
    }
    for (let id of modificationIds || []) {
        const action = await prisma.modification.findUnique({
            where: { id },
            select: {
                name: true,
                vehicleLink: {
                    select: { vehicle: { select: { id: true, name: true } } },
                },
            },
        });
        if (!action) {
            continue;
        }
        const linkedIds = [(_s = action === null || action === void 0 ? void 0 : action.vehicleLink) === null || _s === void 0 ? void 0 : _s.vehicle].filter((id) => id);
        linkedIds.forEach((relation) => {
            if (relation && relation.id !== parentId) {
                linkedItems.push(`${action.name} linked to ${relation.name}`);
            }
        });
    }
    if (linkedItems.length > 0) {
        const items = linkedItems.join(', ');
        throw new Error(`Conflicting relationships exist: ${items}`);
    }
};
