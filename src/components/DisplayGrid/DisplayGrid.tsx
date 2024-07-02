import './DisplayGrid.scss';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../slices';

import Card from '../Card/Card';

export default function DisplayGrid({ action }: { action: any }): JSX.Element {
  const displayList = useSelector((state: RootState) => state.list.displayList);
  const dispatch = useDispatch();

  return (
    <div className="display-grid">
      <ul className="display-grid__list">
        {displayList &&
          displayList.map((item, index) => {
            return (
              <Card
                key={index}
                link={item.link}
                name={item.name}
                image={item.thumb}
                onClick={() => {
                  dispatch(action(item.name));
                }}
              />
            );
          })}
      </ul>
    </div>
  );
}
