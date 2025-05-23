import { $Enums } from '@prisma/client';

interface Item {
  id: number;
  name: string;
  itemType: $Enums.ItemType;
  rarity: $Enums.ItemRarity;
  grade: number;
  picture: Picture;
  description: string | null;
  stats: Stats;
  price: number | null;
  actionIds?: number[];
  itemIds?: number[];
  itemLinkReferenceId?: number | null;
  characterInventoryId: number | null;
  itemLinkId: number | null;
  baseItemId: number | null;
  keywordIds?: { keywordId: number; value: number | null }[];
  // modifiers: Modifier[];
}

type Stats = {
  damage?: number;
  salvo?: number;
  flurry?: number;
  range?: number;
  currentAmmoCount?: number;
  magCapacity?: number;
  currentMagCount?: number;
  magCount?: number;
  armor?: number;
  ward?: number;
  currentBlock?: number;
  block?: number;
  cyber?: number;
  currentPower?: number;
  power?: number;
  weight?: number;
  size?: number;
  speed?: number;
  agility?: number;
  hull?: number;
  currentHull?: number;
  cargo?: number;
  currentCargo?: number;
  hangar?: number;
  currentHangar?: number;
  pass?: number;
  currentPass?: number;
  weapon?: number;
  currentWeapon?: number;
} | null;
