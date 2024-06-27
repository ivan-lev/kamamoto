import './CollectionCategory.scss';

import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { setExhibit } from '../../slices/exhibitsSlice';

import { handleSetCategory } from '../../utils/handleSetCategory';

import { Link } from 'react-router-dom';
import { handleSetList } from '../../utils/handleSetList';

export default function CollectionCategory(): JSX.Element {
  const dispatch = useDispatch();
  const categoryName = useSelector((state: RootState) => state.exhibits.exhibitsCategory);
  const categoryList = useSelector((state: RootState) => state.exhibits.exhibitsList);

  useEffect(() => {
    if (!categoryName) {
      handleSetCategory(dispatch);
      handleSetList(dispatch);
    }
  }, [categoryName]);

  return (
    <section className="section">
      <Link to="/collection">Назад</Link>
      <h3>{categoryName}</h3>
      <ul>
        {categoryList &&
          categoryList.map(item => {
            return (
              <li key={item.id}>
                <Link
                  to={item.id.toString()}
                  onClick={() => {
                    dispatch(setExhibit(item.id));
                  }}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
}
