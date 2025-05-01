export const includeWeaponLinkReference = {
    weapons: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    armors: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    cybernetics: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    actions: { orderBy: { name: 'asc' } },
};
export const includeArmorLinkReference = {
    weapons: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    armors: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    cybernetics: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    actions: { orderBy: { name: 'asc' } },
};
export const includeCyberneticLinkReference = {
    weapons: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    armors: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    cybernetics: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    actions: { orderBy: { name: 'asc' } },
};
export const includeVehicleLinkReference = {
    weapons: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    armors: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    modifications: {
        include: {
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
        },
        orderBy: { name: 'asc' },
    },
    actions: { orderBy: { name: 'asc' } },
};
export const includeCharacterInventory = {
    weapons: {
        include: {
            weaponLinkReference: { include: includeWeaponLinkReference },
            keywords: { include: { keyword: true } },
        },
        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
    },
    armor: {
        include: {
            armorLinkReference: { include: includeArmorLinkReference },
            keywords: { include: { keyword: true } },
        },
        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
    },
    cybernetics: {
        include: {
            cyberneticLinkReference: {
                include: includeCyberneticLinkReference,
            },
            keywords: { include: { keyword: true } },
            modifiers: { include: { action: true } },
        },
        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
    },
    vehicles: {
        include: {
            vehicleLinkReference: {
                include: includeVehicleLinkReference,
            },
        },
        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
    },
    modifications: { orderBy: [{ name: 'asc' }, { grade: 'desc' }] },
    items: {
        include: {
            itemLinkReference: { include: { actions: { orderBy: { name: 'asc' } } } },
            keywords: { include: { keyword: true } },
            modifiers: { include: { action: true } },
        },
        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
    },
};
export const equipLinked = {
    weapons: {
        updateMany: {
            where: {},
            data: {
                equipped: true,
            },
        },
    },
    armors: {
        updateMany: {
            where: {},
            data: {
                equipped: true,
            },
        },
    },
    cybernetics: {
        updateMany: {
            where: {},
            data: {
                equipped: true,
            },
        },
    },
    actions: {
        updateMany: {
            where: {},
            data: {
                equipped: true,
            },
        },
    },
};
export const unequipLinked = {
    weapons: {
        updateMany: {
            where: {},
            data: {
                equipped: false,
            },
        },
    },
    armors: {
        updateMany: {
            where: {},
            data: {
                equipped: false,
            },
        },
    },
    cybernetics: {
        updateMany: {
            where: {},
            data: {
                equipped: false,
            },
        },
    },
    actions: {
        updateMany: {
            where: {},
            data: {
                equipped: false,
            },
        },
    },
};
