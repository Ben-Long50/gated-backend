import { ItemRarity } from '@prisma/client';

interface Vehicle {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string;
  stats: VehicleStats;
  price: number;
  weapons: Weapon[];
  modifications: number[];
}

export interface VehicleStats {
  size: number;
  speed: number;
  agility: number;
  hull: number;
  armor: number;
  cargo: number;
  hangar: number;
  passengers: number;
  weapon: number;
}
