export interface Character {
  playerCharacter: boolean;
  campaignId: number;
  perks: number[];
  stats: CharacterStats;
  firstName: string;
  lastName: string;
  imageUrl: string;
  publicId: string;
  height: number;
  weight: number;
  age: number;
  sex: 'male' | 'female';
  level: number;
  picture: { imageUrl: string; publicId: string };
  profits: number;
  backstory: { html: string; nodes: object };
  firstTaste: { html: string; nodes: object };
  badMedicine: { html: string; nodes: object };
  attributes: string;
}

interface CharacterStats {
  currentHealth: number;
  currentSanity: number;
  injuries: number;
  insanities: number;
}
