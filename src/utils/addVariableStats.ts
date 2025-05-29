import { Stats } from '../types/item';

const addVariableStats = (itemStats: Stats) => {
  let stats = itemStats;

  if (stats?.magCount && !stats?.currentMagCount) {
    stats = { ...stats, currentMagCount: stats.magCount - 1 };
  }

  if (stats?.magCapacity && !stats?.currentAmmoCount) {
    stats = { ...stats, currentAmmoCount: stats.magCapacity };
  }

  if (stats?.block && !stats?.currentBlock) {
    stats = { ...stats, currentBlock: stats.block };
  }

  if (stats?.power && !stats?.currentPower) {
    stats = { ...stats, currentPower: stats.power };
  }

  if (stats?.power && !stats?.currentPower) {
    stats = { ...stats, currentPower: stats.power };
  }

  if (stats?.hull && !stats?.currentHull) {
    stats = { ...stats, currentHull: stats.hull };
  }

  if (stats?.cargo && !stats?.currentCargo) {
    stats = { ...stats, currentCargo: 0 };
  }

  if (stats?.hangar && !stats?.currentHangar) {
    stats = { ...stats, currentHangar: 0 };
  }

  if (stats?.pass && !stats?.currentPass) {
    stats = { ...stats, currentPass: 0 };
  }

  return stats;
};

export default addVariableStats;
