import { ExhibitCategory } from '../types/exhibitCategory';
import { displayListType } from '../types/displayListType';

const keys = Object.keys(ExhibitCategory);

export const categories: displayListType[] = keys.map((key, index) => {
  return {
    id: index,
    thumb: `images/categories/${key}.jpg`,
    name: ExhibitCategory[key as keyof typeof ExhibitCategory],
    link: `${key}`
  };
});
