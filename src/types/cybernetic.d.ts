import { Cybernetic } from '@prisma/client';
import { Action } from './action';
import { Armor, ArmorWithKeywords } from './armor';
import { Weapon, WeaponWithKeywords } from './weapon';

type Cybernetic = Cybernetic<{
  include: { weapons: true; armor: true; actions: true };
}>;

interface CyberneticStats {
  power: number;
  damage: number;
  salvo: number;
  flurry: number;
  range: number;
  magCapacity: number;
  magCount: number;
}
