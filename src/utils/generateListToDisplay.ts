import { ExhibitCategory } from '../types/exhibitCategory';
import { Exhibits } from '../types/exhibitType';

export const generateListToDisplay = (
  category: ExhibitCategory | undefined,
  exhibits: Exhibits
) => {
  let listToDisplay = exhibits
    .map(exhibit => {
      if (exhibit.category === category) {
        return {
          id: exhibit.id,
          thumb: `/exhibits/${exhibit.id}/0.jpg`,
          name: exhibit.name,
          link: `/collection/bowls/${exhibit.id}`
        };
      } else {
        return;
      }
    })
    .filter(Boolean); // to clean array from undefined elements

  return listToDisplay;
};
