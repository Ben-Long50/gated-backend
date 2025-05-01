import { ItemRarity } from '@prisma/client';

export interface Weapon {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string | null;
  stats: WeaponStats;
  price: number | null;
  equipped: boolean | null;
  weaponLinkId: number | null;
  armorLinkId: number | null;
  cyberneticLinkId: number | null;
  vehicleLinkId: number | null;
  weaponIds?: number[];
  armorIds?: number[];
  cyberneticIds?: number[];
  actionIds?: number[];
  weaponLinkReferenceId?: number | null;
  characterInventoryId: number | null;
  baseWeaponId: number | null;
  keywordIds?: { keywordId: number; value: number | null }[];
}

export interface WeaponStats {
  damage?: number;
  salvo?: number;
  flurry?: number;
  range?: number;
  magCapacity?: number;
  magCount?: number;
  currentMagCount?: number;
  currentAmmoCount?: number;
  weight?: number;
}
