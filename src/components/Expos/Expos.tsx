import './Expos.scss';

// Other packages
import { Helmet } from 'react-helmet-async';

import ExhibitionCard from '../ExhibitionCard/ExhibitionCard';
import { exhibitions } from '../../variables/exhibitions';

export default function Expos() {
  const pageTitle = `Kamamoto: мероприятия, на каторых представлена коллекция`;
  const pagePreview = '';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={pagePreview} />
      </Helmet>
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
    </>
  );
}
