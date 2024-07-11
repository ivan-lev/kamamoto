import type { Exhibits } from '../../types/exhibitType';
import { ExhibitCategory } from '../../types/exhibitCategory';
import { ExhibitComplectation } from '../../types/exhibitComplectationType';

const { bowl } = ExhibitComplectation;

export const archive: Exhibits = [
  {
    id: 2699,
    name: 'Чаша с соснами',
    potterName: '',
    potterJapaneseName: '',
    potterPhoto: '',
    additionalPhotos: false,
    category: ExhibitCategory.archive,
    style: 'kyo',
    description: ``,
    additionalDescription: ``,
    price: 0,
    weigth: undefined,
    height: undefined,
    length: undefined,
    width: undefined,
    complectation: [bowl]
  }
];
