export interface Armor {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string | null;
  stats: ArmorStats;
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
  keywordIds?: { keywordId: number; value: number | null }[];
  baseArmorId: number | null;
  characterInventoryId: number | null;
}

export interface ArmorStats {
  armor?: number;
  ward?: number;
  currentBlock?: number;
  block?: number;
  currentPower?: number;
  power?: number;
  weight?: number;
}
