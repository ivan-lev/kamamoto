import './Category.scss';

import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { setExhibit } from '../../slices/exhibitsSlice';

import { handleSetCategory } from '../../utils/handleSetCategory';

import { Link } from 'react-router-dom';
import { handleSetList } from '../../utils/handleSetList';

export default function Category(): JSX.Element {
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
    <section className="section category">
      <Link className="link" to="/collection">
        Назад
      </Link>
      <h3 className="title3 category__title">{categoryName}</h3>
      <ul className="category__list">
        {categoryList &&
          categoryList.map((item, index) => {
            return (
              <li className="category__item" key={item.id + index}>
                <Link
                  className="link"
                  to={item.id.toString()}
                  onClick={() => {
                    dispatch(setExhibit(item.id));
                  }}
                >
                  <img
                    className="category__item-image"
                    src={`/exhibits/${item?.id}/thumb.jpg`}
                  ></img>
                </Link>
                <Link
                  className="link category__link"
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
