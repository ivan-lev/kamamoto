import { ExhibitCategory } from '../../types/exhibitCategory';
import { CeramicStyleType } from '../../types/ceramicStyleType';

export const emptyExhibit = {
  id: 0,
  name: '',
  potterName: '',
  potterJapaneseName: '',
  potterPhoto: '',
  additionalPhotos: false,
  category: ExhibitCategory.other,
  style: CeramicStyleType.other,
  description: ``,
  additionalDescription: ``,
  price: 0,
  weigth: undefined,
  height: undefined,
  length: undefined,
  width: undefined
};
