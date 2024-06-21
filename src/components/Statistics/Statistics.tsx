import './Statistics.scss';

import { statistics } from '../../variables/statistics';

export default function Statistics(): JSX.Element {
  return (
    <section className="statistics">
      <ul className="statistics__list">
        {statistics.map(element => {
          return (
            <li className="statistics__element" key={element.header}>
              <span className="statistics__header muted">{element.header}</span>
              <span className="statistics__number">{element.value}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
