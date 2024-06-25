import { ceramicKindType } from './ceramicKindType';

export type ceramicPiece = {
  id: number;
  name: string;
  potterName?: string;
  kind: ceramicKindType;
  description: string;
  additionalDescription?: string;
  price: number;
};
