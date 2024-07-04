import './Category.scss';

// React
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Redux
import { RootState } from '../../slices';
import { setExhibit } from '../../slices/exhibitSlice';
import { setDisplayList } from '../../slices/listSlice';
import { setCategory } from '../../slices/categorySlice';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';

// Utils and variables
import { exhibits } from '../../variables/exhibits';
import { generateListToDisplay } from '../../utils/generateListToDisplay';

import { ExhibitCategory } from '../../types/exhibitCategory';

export default function Category(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const category = useSelector((state: RootState) => state.category.category);

  useEffect(() => {
    if (category) {
      dispatch(setDisplayList(generateListToDisplay(category, exhibits)));
    } else {
      const currentCategory =
        ExhibitCategory[location.pathname.split('/').pop() as keyof typeof ExhibitCategory];
      dispatch(setCategory(currentCategory));
    }
  }, [category]);

  return (
    <section className="section category">
      <h3 className="title3 category__title">{category}</h3>
      <DisplayGrid action={setExhibit} />
    </section>
  );
}
