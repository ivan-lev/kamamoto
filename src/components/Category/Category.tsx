import './Category.scss';

// React
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Redux
import { setCategory } from '../../slices/categorySlice';
import { resetCategory } from '../../slices/categorySlice';
import { setDisplayList } from '../../slices/listSlice';
import { resetDisplayList } from '../../slices/listSlice';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';

// Utils and variables
import { exhibits } from '../../variables/exhibits';
import { generateListToDisplay } from '../../utils/generateListToDisplay';
import { getCategory } from '../../utils/getCategory';

import { ExhibitCategory } from '../../types/exhibitCategory';

export default function Category(): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const category = getCategory(location);
  const categoryName = ExhibitCategory[category as keyof typeof ExhibitCategory];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    dispatch(setCategory(category));
    dispatch(setDisplayList(generateListToDisplay(category, exhibits)));

    return () => {
      if (category) {
        dispatch(resetCategory());
        dispatch(resetDisplayList());
      }
    };
  }, []);

  return (
    <section className="section category">
      <h3 className="title3 category__title">{categoryName}</h3>
      <DisplayGrid />
    </section>
  );
}
