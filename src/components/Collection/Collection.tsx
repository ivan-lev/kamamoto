import './Collection.scss';

// React
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Redux
import { setCategory } from '../../slices/categorySlice';
import { setDisplayList } from '../../slices/listSlice';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';

// Utils and variables
import { categories } from '../../variables/categories';

export default function Collection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDisplayList(categories));
  }, []);

  return (
    <section className="section collection">
      <h2 className="title title2">Коллекция</h2>
      <DisplayGrid action={setCategory} />
    </section>
  );
}
