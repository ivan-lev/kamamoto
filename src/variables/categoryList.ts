import { ExhibitCategory } from '../types/exhibitCategory';
import { displayListType } from '../types/displayListType';

const keys = Object.keys(ExhibitCategory);

export const categoryList: displayListType[] = keys.map((key, index) => {
  return {
    id: index,
    thumb: `../../public/images/categories/${key}.jpg`,
    name: ExhibitCategory[key as keyof typeof ExhibitCategory],
    link: `/collection/${key}`
  };
});
