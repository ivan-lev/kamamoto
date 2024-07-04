import './DisplayGrid.scss';

// React
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { RootState } from '../../slices';

// Components
import Card from '../Card/Card';

export default function DisplayGrid({
  action
}: {
  action: ActionCreatorWithPayload<any, any>;
}): JSX.Element {
  const displayList = useSelector((state: RootState) => state.list.displayList);
  const dispatch = useDispatch();

  return (
    <div className="display-grid">
      <ul className="display-grid__list">
        {displayList &&
          displayList.map((item, index) => {
            return (
              <li className="display-grid__element" key={index}>
                <Card
                  link={item.link}
                  name={item.name}
                  image={item.thumb}
                  onClick={() => {
                    dispatch(action(item.name));
                  }}
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
