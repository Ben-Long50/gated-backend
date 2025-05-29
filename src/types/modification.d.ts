export interface Modification {
  id: number;
  name: string;
  rarity: ItemRarity;
  grade: number;
  picture: Picture;
  description: string | null;
  stats: ModificationStats;
  modificationType: string;
  price: number | null;
  actionIds?: number[];
  vehicleLinkId: number | null;
  droneLinkId: number | null;
  modificationLinkReferenceId?: number | null;
  characterInventoryId: number | null;
  baseModificationId: number | null;
  keywordIds?: { keywordId: number; value: number | null }[];
}

export interface ModificationStats {
  speed?: number;
  health?: number;
  evasion?: number;
}
