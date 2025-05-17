import prisma from '../config/database.js';
export const enforceSingularLinking = async (parentId, itemIds, actionIds) => {
    var _a, _b;
    const linkedItems = [];
    for (let id of itemIds || []) {
        const item = await prisma.item.findUnique({
            where: { id },
            select: {
                name: true,
                itemLink: {
                    select: { item: { select: { id: true, name: true } } },
                },
            },
        });
        if (!item) {
            continue;
        }
        const parentItem = (_a = item.itemLink) === null || _a === void 0 ? void 0 : _a.item;
        if (parentItem && parentItem.id !== parentId) {
            linkedItems.push(`${item.name} linked to ${parentItem.name}`);
        }
    }
    for (let id of actionIds || []) {
        const action = await prisma.action.findUnique({
            where: { id },
            select: {
                name: true,
                itemLink: {
                    select: { item: { select: { id: true, name: true } } },
                },
            },
        });
        if (!action) {
            continue;
        }
        const parentItem = (_b = action.itemLink) === null || _b === void 0 ? void 0 : _b.item;
        if (parentItem && parentItem.id !== parentId) {
            linkedItems.push(`${action.name} linked to ${parentItem.name}`);
        }
    }
    if (linkedItems.length > 0) {
        const items = linkedItems.join(', ');
        throw new Error(`Conflicting relationships exist: ${items}`);
    }
};
