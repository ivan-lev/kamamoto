import './Expos.scss';

//React
import { useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setExhibitionsList } from '../../slices/exhibitionsSlice';
import { RootState } from '../../slices';

// Other packages
import { Helmet } from 'react-helmet-async';

// Components
import ExhibitionCard from '../ExhibitionCard/ExhibitionCard';

// Utils
import { api } from '../../utils/api';

export default function Expos(): JSX.Element {
  const dispatch = useDispatch();
  const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);

  const pageTitle = `Камамото: мероприятия, на каторых представлена коллекция`;
  const pagePreview = 'https://kamamoto.ru/images/og-image.jpg';

  useEffect(() => {
    if (exhibitions.length === 0) {
      api.getExhibitions().then(response => {
        dispatch(setExhibitionsList(response));
      });
    }
  }, []);

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
