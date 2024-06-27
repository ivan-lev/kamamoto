import './CollectionCategory.scss';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../slices';
import { setExhibit } from '../../slices/exhibitsSlice';

import { Link } from 'react-router-dom';

export default function CollectionCategory(): JSX.Element {
  const dispatch = useDispatch();
  const categoryName = useSelector((state: RootState) => state.exhibits.exhibitsCategory);
  const categoryList = useSelector((state: RootState) => state.exhibits.exhibitsList);

  return (
    <section className="section">
      <Link to="/collection">Назад</Link>
      <h3>{categoryName}</h3>
      <ul>
        {categoryList &&
          categoryList.map(item => {
            return (
              <li>
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
