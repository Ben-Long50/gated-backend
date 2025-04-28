import { ItemRarity } from '@prisma/client';
import { Action } from './action';

interface Weapon {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string;
  stats: WeaponStats;
  price: number;
  equipped: boolean;
  cyberneticId?: number | null;
  vehicleId?: number | null;
  keywords: { keywordId: number; value?: number }[];
  actions?: Action[];
}

export interface WeaponStats {
  damage: number;
  salvo: number;
  flurry: number;
  range: number;
  magCapacity: number;
  magCount: number;
  weight: number;
}
