import { ExhibitsCategory } from './exhibitsCategory';
import { CeramicStyleType } from './ceramicStyleType';

export type Exhibit = {
  id: number;
  name: string;
  potterName?: string;
  potterJapaneseName?: string;
  potterPhoto?: string;
  additionalPhotos: boolean;
  category: ExhibitsCategory;
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
