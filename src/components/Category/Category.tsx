import './Category.scss';

// React
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// Redux
import { setCategory } from '../../slices/categorySlice';
import { resetCategory } from '../../slices/categorySlice';
import { setDisplayList } from '../../slices/listSlice';
import { resetDisplayList } from '../../slices/listSlice';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';
import Seo from '../Seo/Seo';

// Utils
import { generateListToDisplay } from '../../utils/generateListToDisplay';
import { getCategory } from '../../utils/getCategory';

//Variables
import { exhibits } from '../../variables/exhibits';

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
    <>
      <Seo title={`Камамото: ${categoryName.toLowerCase()}`} />

      <section className="section category">
        <div className="exhibit__breadcrumbs">
          <Link to=".." className="link link_navigational muted exhibit__link" relative="path">
            <img
              className="background-muted bordered link__icon"
              src="/icons/link-arrow-left.svg"
            />
            Назад
          </Link>
        </div>

        <h3 className="title title3 category__title">{categoryName}</h3>
        <DisplayGrid />
      </section>
    </>
  );
}
