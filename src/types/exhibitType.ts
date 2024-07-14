import type { ExhibitCategory } from './exhibitCategory';
import type { CeramicStyleType } from './ceramicStyleType';
import type { ExhibitComplectation } from './exhibitComplectationType';

export type Exhibit = {
  id: number;
  name: string;
  age?: string;
  potterName?: string;
  potterJapaneseName?: string;
  potterLifeDates?: string;
  category: ExhibitCategory;
  style: keyof typeof CeramicStyleType;
  description: string;

  potterPhoto?: string;
  potterInfo?: string;

  additionalDescription?: string;
  additionalPhotos: boolean;
  additionalPhotosCount?: number;

  price: number;
  height?: number;
  length?: number;
  width?: number;
  weigth?: number;
  weightOfSet?: number;
  complectation: ExhibitComplectation[];
  preservation?: string;
};

export type Exhibits = Exhibit[];
