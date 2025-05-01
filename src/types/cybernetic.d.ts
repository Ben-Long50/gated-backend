export interface Cybernetic {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string;
  cyberneticType: string;
  stats: CyberneticStats;
  price: number | null;
  equipped: boolean | null;
  weaponLinkId: number | null;
  armorLinkId: number | null;
  cyberneticLinkId: number | null;
  weaponIds?: number[];
  armorIds?: number[];
  cyberneticIds?: number[];
  actionIds?: number[];
  modifiers?: Modifier[];
  keywordIds?: { keywordId: number; value: number | null }[];
  baseCyberneticId: number | null;
  characterInventoryId: number | null;
}

export interface CyberneticStats {
  cyber?: number;
  power?: number;
  currentPower?: number;
}
