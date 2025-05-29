export const includeCharacterInventory = {
    items: {
        include: {
            itemLinkReference: {
                include: {
                    items: {
                        include: {
                            baseItem: { select: { id: true, name: true, updatedAt: true } },
                        },
                        orderBy: { name: 'asc' },
                    },
                    actions: { orderBy: { name: 'asc' } },
                },
            },
            keywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
            modifiedKeywords: {
                include: { keyword: true },
                orderBy: { keyword: { name: 'asc' } },
            },
            conditions: {
                include: { condition: true },
                orderBy: { condition: { name: 'asc' } },
            },
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
