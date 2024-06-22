import './Exhibitions.scss';

import ExhibitionCard from '../ExhibitionCard/ExhibitionCard';
import { exhibitions } from '../../variables/exhibitions';

export default function Exhibitions() {
  return (
    <section className="exhibitions">
      <h2 className="title title2">Выставки</h2>
      <ul className="exhibitions__list">
        {exhibitions
          .map(exhibition => {
            return (
              <li className="exhibitions__element" key={exhibition.id}>
                <ExhibitionCard exhibition={exhibition} />
              </li>
            );
          })
          .reverse()}
      </ul>
    </section>
  );
}
