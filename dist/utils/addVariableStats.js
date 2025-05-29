const addVariableStats = (itemStats) => {
    let stats = itemStats;
    if ((stats === null || stats === void 0 ? void 0 : stats.magCount) && !(stats === null || stats === void 0 ? void 0 : stats.currentMagCount)) {
        stats = Object.assign(Object.assign({}, stats), { currentMagCount: stats.magCount - 1 });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.magCapacity) && !(stats === null || stats === void 0 ? void 0 : stats.currentAmmoCount)) {
        stats = Object.assign(Object.assign({}, stats), { currentAmmoCount: stats.magCapacity });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.block) && !(stats === null || stats === void 0 ? void 0 : stats.currentBlock)) {
        stats = Object.assign(Object.assign({}, stats), { currentBlock: stats.block });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
        stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.power) && !(stats === null || stats === void 0 ? void 0 : stats.currentPower)) {
        stats = Object.assign(Object.assign({}, stats), { currentPower: stats.power });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.hull) && !(stats === null || stats === void 0 ? void 0 : stats.currentHull)) {
        stats = Object.assign(Object.assign({}, stats), { currentHull: stats.hull });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.cargo) && !(stats === null || stats === void 0 ? void 0 : stats.currentCargo)) {
        stats = Object.assign(Object.assign({}, stats), { currentCargo: 0 });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.hangar) && !(stats === null || stats === void 0 ? void 0 : stats.currentHangar)) {
        stats = Object.assign(Object.assign({}, stats), { currentHangar: 0 });
    }
    if ((stats === null || stats === void 0 ? void 0 : stats.pass) && !(stats === null || stats === void 0 ? void 0 : stats.currentPass)) {
        stats = Object.assign(Object.assign({}, stats), { currentPass: 0 });
    }
    return stats;
};
export default addVariableStats;
