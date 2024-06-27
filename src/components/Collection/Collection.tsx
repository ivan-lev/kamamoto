import './Collection.scss';

import { Link } from 'react-router-dom';

import { ExhibitsCategory } from '../../types/exhibitsCategory';

import { useDispatch } from 'react-redux';
import { setExhibitsCategory, setExhibitsList } from '../../slices/exhibitsSlice';

export default function Collection() {
  const dispatch = useDispatch();

  return (
    <section className="section collection">
      <h2 className="title title2">Коллекция</h2>
      <ul className="">
        {(Object.keys(ExhibitsCategory) as Array<keyof typeof ExhibitsCategory>).map(key => {
          return (
            <li key={key}>
              <Link
                className="footer__column-element"
                to={key}
                onClick={() => {
                  dispatch(setExhibitsCategory(key));
                  dispatch(setExhibitsList(key));
                }}
              >
                {ExhibitsCategory[key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
