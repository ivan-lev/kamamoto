import './Category.scss';

// React
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Redux
import { setDisplayList } from '../../slices/listSlice';
import { setCategory } from '../../slices/categorySlice';

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
  const currentCategory = getCategory(location);
  const categoryName = ExhibitCategory[currentCategory as keyof typeof ExhibitCategory];

  useEffect(() => {
    dispatch(setCategory(currentCategory));
    dispatch(setDisplayList(generateListToDisplay(currentCategory, exhibits)));
  }, []);

  return (
    <section className="section category">
      <h3 className="title3 category__title">{categoryName}</h3>
      <DisplayGrid />
    </section>
  );
}
