// Types
import type { RootState } from '../../slices';

// React and Redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setExhibitionsList } from '../../slices/exhibitionsSlice';

// Components
import ExhibitionCard from '../ExhibitionCard/ExhibitionCard';
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils
import { api } from '../../utils/api';

import './Expos.scss';

export default function Expos(): JSX.Element {
  const dispatch = useDispatch();
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);

  useEffect(() => {
    if (exhibitions.length === 0) {
      api
        .getExhibitions()
        .then((response) => {
          dispatch(setExhibitionsList(response));
          setShowPreloader(false);
        })
        .catch((error) => {
          console.error(error);
          setShowPreloader(false);
        });
    }
    else {
      setShowPreloader(false);
    }
  }, []);

  return (
    <>
      <Seo title="Камамото: мероприятия, на каторых представлена коллекция" />

      <section className="section">
        <h2 className="title title2">Выставки</h2>
        {showPreloader
          ? (
              <Preloader />
            )
          : (
              <div className="expos">
                <ul className="expos__list">
                  {exhibitions
                    .map((exhibition) => {
                      return (
                        <li className="expos__element" key={exhibition.id}>
                          <div className="expos__element-upper-line"></div>
                          <div className="expos__element-year">{exhibition.year}</div>
                          <div className="expos__element-lower-line"></div>
                          <ExhibitionCard exhibition={exhibition} />
                        </li>
                      );
                    })
                    .reverse()}
                </ul>
              </div>
            )}
      </section>
    </>
  );
}
