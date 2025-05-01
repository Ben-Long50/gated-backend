import { ItemRarity } from '@prisma/client';

interface Vehicle {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string | null;
  stats: VehicleStats;
  price: number | null;
  weaponIds?: number[];
  armorIds?: number[];
  actionIds?: number[];
  modificationIds?: number[];
  vehicleLinkReferenceId?: number | null;
  characterInventoryId: number | null;
  baseVehicleId: number | null;
  keywordIds?: { keywordId: number; value: number | null }[];
}

export interface VehicleStats {
  size?: number;
  speed?: number;
  agility?: number;
  hull?: number;
  currentHull?: number;
  armor?: number;
  cargo?: number;
  currentCargo?: number;
  hangar?: number;
  currentHangar?: number;
  pass?: number;
  currentPass?: number;
  weapon?: number;
  currentWeapon?: number;
}
