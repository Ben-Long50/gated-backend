import { Action } from './action';

interface Armor {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string;
  stats: ArmorStats;
  price: number;
  equipped: boolean;
  actions?: Action[];
  keywords: { keywordId: number; value?: number }[];
}

export interface ArmorStats {
  armor: number;
  ward: number;
  block: number;
  power: number;
  weight: number;
}
