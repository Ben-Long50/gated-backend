import { $Enums } from '@prisma/client';

interface Item {
  id: number;
  name: string;
  rarity: $Enums.ItemRarity;
  grade: number;
  picture: Picture;
  description: string | null;
  stats: ItemStats;
  price: number | null;
  category: $Enums.ItemCategory;
  subcategory: $Enums.ItemSubcategory;
  itemType: string | null;
  actionIds?: number[];
  itemLinkReferenceId?: number | null;
  characterInventoryId: number | null;
  baseItemId: number | null;
  keywordIds?: { keywordId: number; value: number | null }[];
  // modifiers: Modifier[];
}

interface ItemStats {
  power?: number;
  currentPower?: number;
  weight?: number;
}
