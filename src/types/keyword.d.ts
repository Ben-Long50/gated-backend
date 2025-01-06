import { $Enums } from '@prisma/client';

export type KeywordType = $Enums.KeywordType;

export interface Keyword {
  id: number;
  name: string;
  description: string;
  keywordType: KeywordType;
}
