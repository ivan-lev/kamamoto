import { ExhibitCategory } from './exhibitCategory';
import { CeramicStyleType } from './ceramicStyleType';

export type Exhibit = {
  id: number;
  name: string;
  potterName?: string;
  potterJapaneseName?: string;
  potterPhoto?: string;
  additionalPhotos: boolean;
  category: ExhibitCategory;
  style: CeramicStyleType;
  description: string;
  additionalDescription?: string;
  price: number;
  weigth?: number;
  height?: number;
  length?: number;
  width?: number;
};

export type Exhibits = Exhibit[];
