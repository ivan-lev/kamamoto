import './Collection.scss';

import { useDispatch } from 'react-redux';
import { resetExhibitsCategory, setExhibitsCategory } from '../../slices/exhibitsSlice';

import DisplayGrid from '../DisplayGrid/DisplayGrid';
import { categoryList } from '../../variables/categoryList';
import { setDisplayList, resetDisplayList } from '../../slices/listSlice';
import { useEffect } from 'react';

export default function Collection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDisplayList(categoryList));
    return () => {
      dispatch(resetDisplayList());
      dispatch(resetExhibitsCategory());
    };
  }, []);

  return (
    <section className="section collection">
      <h2 className="title title2">Коллекция</h2>
      <DisplayGrid action={setExhibitsCategory} />
    </section>
  );
}
