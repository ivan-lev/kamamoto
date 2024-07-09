import './Expos.scss';

import ExhibitionCard from '../ExhibitionCard/ExhibitionCard';
import { exhibitions } from '../../variables/exhibitions';

export default function Expos() {
  return (
    <section className="section exposs">
      <h2 className="title title2">Выставки</h2>
      <ul className="expos__list">
        {exhibitions
          .map(exhibition => {
            return (
              <li className="expos__element" key={exhibition.id}>
                <ExhibitionCard exhibition={exhibition} />
              </li>
            );
          })
          .reverse()}
      </ul>
    </section>
  );
}
