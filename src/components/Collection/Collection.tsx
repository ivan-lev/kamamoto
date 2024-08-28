import './Collection.scss';

// React
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux
import { setDisplayList } from '../../slices/listSlice';
import { resetDisplayList } from '../../slices/listSlice';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';
import Seo from '../Seo/Seo';

// Utils and variables
import { categories } from '../../variables/categories';

export default function Collection() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    dispatch(setDisplayList(categories));

    return () => {
      dispatch(resetDisplayList());
    };
  }, []);

  return (
    <>
      <Seo title="Камамото: коллекция японской керамики" />

      <section className="section collection">
        <h2 className="title title2">Коллекция</h2>
        <DisplayGrid />
      </section>
    </>
  );
}
