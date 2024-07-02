import './Category.scss';

// React
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { setExhibit } from '../../slices/exhibitsSlice';
import { setDisplayList } from '../../slices/listSlice';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';

// Utils and variables
import { handleSetCategory } from '../../utils/handleSetCategory';
import { exhibits } from '../../variables/exhibits';

export default function Category(): JSX.Element {
  const dispatch = useDispatch();
  const categoryName = useSelector((state: RootState) => state.exhibits.exhibitsCategory);

  useEffect(() => {
    if (!categoryName) {
      handleSetCategory(dispatch);
    }

    if (categoryName) {
      let listToDisplay = exhibits
        .map(exhibit => {
          if (exhibit.category === categoryName) {
            return {
              id: exhibit.id,
              thumb: `/exhibits/${exhibit.id}/thumb.jpg`,
              name: exhibit.name,
              link: `/collection/bowls/${exhibit.id}`
            };
          } else {
            return;
          }
        })
        .filter(Boolean); // to clean array from undefined elements

      if (!listToDisplay) {
        listToDisplay = [];
      }

      dispatch(setDisplayList(listToDisplay));
    }
  }, [categoryName]);

  return (
    <section className="section category">
      <Link className="link" to="/collection">
        Назад
      </Link>
      <h3 className="title3 category__title">{categoryName}</h3>

      <DisplayGrid action={setExhibit} />
    </section>
  );
}
