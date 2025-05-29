import { Action } from './action';
import { Keyword } from './keyword';
import { Picture } from './picture';
import { WeaponWithKeywords } from './weapon';

interface Drone {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string | null;
  stats: DroneStats;
  price: number | null;
  weaponIds?: number[];
  actionIds?: number[];
  modificationIds?: number[];
  droneLinkReferenceId?: number | null;
  characterInventoryId: number | null;
  baseDroneId: number | null;
  keywordIds?: { keywordId: number; value: number | null }[];
}

interface DroneStats {
  health?: number;
  currentHealth?: number;
  power?: number;
  currentPower?: number;
  armor?: number;
  speed?: number;
  weight?: number;
}
