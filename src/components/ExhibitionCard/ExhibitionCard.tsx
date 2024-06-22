import './ExhibitionCard.scss';

import type { Exhibition } from '../../types/exhibitionType';

export default function ExhibitionCard({ exhibition }: { exhibition: Exhibition }): JSX.Element {
  return (
    <>
      <div className="exhibition__upper-line"></div>
      <div className="exhibition__year">{exhibition.year}</div>
      <div className="exhibition__lower-line"></div>
      <div className="container background-muted bordered exhibition__card">
        <p className="background-muted bordered exhibition__dates">{exhibition.dates}</p>
        <p className="exhibition__city">{exhibition.city}</p>
        <div>
          {exhibition.link ? (
            <a className="exhibition__link" href={exhibition.link}>
              {exhibition.name}
            </a>
          ) : (
            <p className="exhibition__name">«{exhibition.name}»</p>
          )}
          <p className="exhibition__place">{exhibition.place}</p>
        </div>
      </div>
    </>
  );
}
