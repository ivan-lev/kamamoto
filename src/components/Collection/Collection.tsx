import './Collection.scss';

// React
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux
import { setDisplayList } from '../../slices/listSlice';
import { resetDisplayList } from '../../slices/listSlice';

// Other packages
import { Helmet } from 'react-helmet-async';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';

// Utils and variables
import { categories } from '../../variables/categories';

export default function Collection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDisplayList(categories));

    return () => {
      dispatch(resetDisplayList());
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Kamamoto: коллекция японской керамики по категориям`}</title>
        <meta property="og:title" content={`Kamamoto: коллекция японской керамики по категориям`} />
        <meta property="og:image" content={`https://kamamoto.ru/images/og-image.jpg`} />
      </Helmet>
      <section className="section collection">
        <h2 className="title title2">Коллекция</h2>
        <DisplayGrid />
      </section>
    </>
  );
}
