import { Cybernetic } from '@prisma/client';
import { Action } from './action';
import { Armor, ArmorWithKeywords } from './armor';
import { Weapon, WeaponWithKeywords } from './weapon';
import { Modifier } from './modifier';

export interface Cybernetic {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string;
  cyberneticType: string;
  cyber: number;
  stats: CyberneticStats;
  price: number;
  equipped: boolean;
  body: string[];
  weapons: Weapon[];
  armor: Armor[];
  actions: Action[];
  modifiers: Modifier[];
  keywords: { keywordId: number; value?: number }[];
}

interface CyberneticStats {
  power: number;
  damage: number;
  salvo: number;
  flurry: number;
  range: number;
  magCapacity: number;
  magCount: number;
}
