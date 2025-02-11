import { $Enums } from '@prisma/client';

interface Item {
  id: number;
  publicId?: string;
  imageUrl?: string;
  picture?: { publicId: string; imageUrl: string };
  category: $Enums.ItemCategory;
  subcategory: $Enums.ItemSubcategory;
  itemType?: string;
  name: string;
  rarity: $Enums.ItemRarity;
  grade: number;
  stats: Partial<ItemStats>;
  price: number;
  description: string;
  actions: Action[];
  modifiers: Modifier[];
}

interface ItemStats {
  power: number;
  weight: number;
  currentStacks: number;
  maxStacks: number;
}
