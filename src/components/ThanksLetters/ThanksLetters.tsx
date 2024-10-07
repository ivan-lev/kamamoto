import './ThanksLetters.scss';

// React
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { RootState } from '../../slices';
import { setLettersList } from '../../slices/lettersSlice';

// Components
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Variables
import { api } from '../../utils/api';

export default function ThanksLetters(): JSX.Element {
  const dispatch = useDispatch();
  const [showPreloader, setShowPreloader] = useState<boolean>(true);
  const letters = useSelector((state: RootState) => state.letters);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    if (letters.length === 0) {
      api
        .getLetters()
        .then(letters => {
          dispatch(setLettersList(letters))
          setShowPreloader(false)
        })
        .catch(error => {
          console.log(error)
        
          setShowPreloader(false);
        })
      } else {
        setShowPreloader(false);
      }
  }, []);

  return (
    <>
      <Seo title="Камамото: благодарственные письма" />

      <section className="section thanks-letters">
        <h2 className="title title2">Благодарственные письма</h2>
        <span className="subtitle">
          Письма от организаций и людей, с которыми мы совместно организовывали выставки и
          мероприятия.
        </span>
        {showPreloader ? (
          <Preloader />
        ) : (
        <div className="container background-muted bordered thanks-letters__list">
          {letters.map(letter => {
            return (
              <div className="thanks-letters__element" key={letter.id}>
                <a className="thanks-letters__link" href={letter.name} target="_blank">
                  <img className="thanks-letters__preview" src={letter.preview}></img>
                </a>
                <p className="thanks-letters__description">{letter.description}</p>
              </div>
            );
          })}
        </div>
        )}
      </section>
    </>
  );
}
