import './ThanksLetters.scss';

// React
import { useLayoutEffect } from 'react';

// Components
import Seo from '../Seo/Seo';

// Variables
import { thanksLetters } from '../../variables/thanksLetters';

export default function ThanksLetters(): JSX.Element {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Seo title="Камамото: благодарственные письма" />

      <section className="section thanks-letters">
        <h2 className="title title2">Благодарственные письма</h2>
        <span className="subtitle">
          Письма от организаций и людей, с которыми мы совместно организовывали выставки и
          мероприятия.
        </span>
        <div className="container background-muted bordered thanks-letters__list">
          {thanksLetters.map(letter => {
            return (
              <div className="thanks-letters__element" key={letter.id}>
                <a className="thanks-letters__link" href={letter.link} target="_blank">
                  <img className="thanks-letters__preview" src={letter.preview}></img>
                </a>
                <p className="thanks-letters__description">{letter.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
