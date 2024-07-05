import { ExhibitCategory } from '../types/exhibitCategory';
import { Exhibits } from '../types/exhibitType';

export const generateListToDisplay = (category: string, exhibits: Exhibits) => {
  let listToDisplay = exhibits
    .map(exhibit => {
      const categoryToDisplay = ExhibitCategory[category as keyof typeof ExhibitCategory];
      if (exhibit.category === categoryToDisplay) {
        return {
          id: exhibit.id,
          thumb: `/exhibits/${exhibit.id}/0.jpg`,
          name: exhibit.name,
          link: String(exhibit.id)
        };
      } else {
        return;
      }
    })
    .filter(Boolean); // to clean array from undefined elements

  return listToDisplay;
};
