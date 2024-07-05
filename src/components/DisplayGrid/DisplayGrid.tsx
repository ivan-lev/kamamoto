import './DisplayGrid.scss';

// React
import { useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';

// Components
import Card from '../Card/Card';

export default function DisplayGrid(): JSX.Element {
  const displayList = useSelector((state: RootState) => state.list.displayList);

  return (
    <div className="display-grid">
      <ul className="display-grid__list">
        {displayList &&
          displayList.map((item, index) => {
            return (
              <li className="display-grid__element" key={index}>
                <Card link={item.link} name={item.name} image={item.thumb} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
