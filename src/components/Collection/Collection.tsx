import './Collection.scss';

import { Link } from 'react-router-dom';

import { CeramicKindType } from '../../types/ceramicKindType';

export default function Collection() {
  return (
    <section className="section collection">
      <h2 className="title title2">Коллекция</h2>
      <ul className="">
        {(Object.keys(CeramicKindType) as Array<keyof typeof CeramicKindType>).map(key => {
          return (
            <li key={key}>
              <Link className="footer__column-element" to={key}>
                {CeramicKindType[key]}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
