import './ExhibitionCard.scss';

// React
import { Link } from 'react-router-dom';

import type { Exhibition } from '../../types/exhibitionType';

export default function ExhibitionCard({ exhibition }: { exhibition: Exhibition }): JSX.Element {
  const { id, name, year, dates, city, place, link, isPageActive } = exhibition;
  return (
    <>
      <div className="exhibition__upper-line"></div>
      <div className="exhibition__year">{year}</div>
      <div className="exhibition__lower-line"></div>
      <div className="container background-muted bordered exhibition__card">
        <p className="background-muted bordered exhibition__dates">{dates}</p>
        <p className="exhibition__city">{city}</p>
        <div>
          {link ? (
            <a className="exhibition__link" href={link} target="_blank">
              {name}
            </a>
          ) : (
            <p className="exhibition__name">«{name}»</p>
          )}
          <p className="exhibition__place">{place}</p>
        </div>
        {isPageActive && (
          <Link className="link muted exhibition__more-link" to={id.toString()}>
            Подробнее
          </Link>
        )}
      </div>
    </>
  );
}
