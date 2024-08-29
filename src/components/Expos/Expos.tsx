import './Expos.scss';

//React
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { setExhibitionsList } from '../../slices/exhibitionsSlice';
import { RootState } from '../../slices';

// Components
import ExhibitionCard from '../ExhibitionCard/ExhibitionCard';
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';

export default function Expos(): JSX.Element {
  const dispatch = useDispatch();
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);

  useEffect(() => {
    if (exhibitions.length === 0) {
      api
        .getExhibitions()
        .then(response => {
          dispatch(setExhibitionsList(response));
          setShowPreloader(false);
        })
        .catch(error => {
          console.log(error);
          setShowPreloader(false);
        });
    } else {
      setShowPreloader(false);
    }
  }, []);

  return (
    <>
      <Seo title="Камамото: мероприятия, на каторых представлена коллекция" />

      <section className="section exposs">
        <h2 className="title title2">Выставки</h2>
        {showPreloader ? (
          <Preloader />
        ) : (
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
        )}
      </section>
    </>
  );
}
