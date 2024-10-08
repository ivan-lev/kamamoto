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

// Other packages
import { Helmet } from 'react-helmet-async';

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

  const pageTitle = `Камамото: ${categoryName.charAt(0).toLowerCase()}${categoryName.slice(1)}`;
  const pagePreview = `https://kamamoto.ru/images/categories/${category}.jpg`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={pagePreview} />
      </Helmet>
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
