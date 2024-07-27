import './Benefactors.scss';

// React hooks
import { useLayoutEffect } from 'react';

// Other packages
import { Helmet } from 'react-helmet-async';

export default function Benefactors() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Helmet>
        <title>{`Камамото: страница о людях, внесших вклад в развитие коллекции`}</title>
        <meta property="og:title" content={`Камамото: о благодетелях`} />
        <meta property="og:image" content={`https://kamamoto.ru/about-avatar.jpg`} />
      </Helmet>
      <section className="section collection">
        <h2 className="title title2">Благодетели</h2>
        <span className="subtitle">
          Страница, на которой я хочу рассказать о людях, которые внесли свой вклад в развите
          коллекции
        </span>
        <div className="container bordered background-muted">Страница в процессе разработки</div>
      </section>
    </>
  );
}
