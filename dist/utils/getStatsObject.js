const getStatsObject = (item) => {
    if (!item.stats) {
        throw new Error('Armor not found');
    }
    const statsObject = Object.fromEntries(Object.entries(item.stats).map(([stat, value]) => {
        var _a, _b;
        const modifiedValue = (_b = (_a = item.modifiedStats) === null || _a === void 0 ? void 0 : _a[stat]) !== null && _b !== void 0 ? _b : 0;
        return [stat, value + modifiedValue];
    }));
    return statsObject;
};
export default getStatsObject;
