import { $Enums } from '@prisma/client';

export type KeywordType = $Enums.KeywordType;

export interface Keyword {
  keywordId: number;
  name: string;
  description: string;
  keywordType: KeywordType;
  gpCost: number;
}
