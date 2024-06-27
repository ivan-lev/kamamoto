import { CeramicKindType } from './ceramicKindType';
import { CeramicStyleType } from './ceramicStyleType';

export type Exhibit = {
  id: number;
  name: string;
  potterName?: string;
  potterJapaneseName?: string;
  kind: CeramicKindType;
  style: CeramicStyleType;
  description: string;
  additionalDescription?: string;
  price: number;
};

export type Exhibits = Exhibit[];
