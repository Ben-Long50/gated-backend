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
export const includeDroneLinkReference = {
    weapons: {
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
    items: {
        include: {
            itemLinkReference: {
                include: {
                    items: { orderBy: { name: 'asc' } },
                    actions: { orderBy: { name: 'asc' } },
                },
            },
            keywords: { include: { keyword: true } },
        },
        orderBy: [{ name: 'asc' }, { grade: 'desc' }],
    },
    actions: { orderBy: { name: 'asc' } },
};
export const includeCharacterCart = {
    items: {
        include: {
            item: {
                include: {
                    itemLinkReference: {
                        include: {
                            items: { orderBy: { name: 'asc' } },
                            actions: { orderBy: { name: 'asc' } },
                        },
                    },
                },
            },
        },
        orderBy: { item: { name: 'asc' } },
    },
};
export const equipLinked = {
    items: {
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
    items: {
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
