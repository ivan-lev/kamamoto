import './Card.scss';

import { useState } from 'react';

import { Link } from 'react-router-dom';

import preloader from '/public/icons/preloader.svg';

export default function Card({
  link,
  name,
  image
}: {
  link: string;
  name: string;
  image: string;
}): JSX.Element {
  const [loading, setLoading] = useState(true);

  return (
    <div className="card">
      <div className="card__image-wrapper">
        {loading && <img className="card__preloader" alt="Exhibit preview" src={preloader}></img>}
        <Link className="link" to={link} style={{ display: loading ? 'none' : 'flex' }}>
          <div className="card__image-shadow"></div>
          <img
            className="card__image"
            alt="Exhibit preview"
            src={image}
            onLoad={() => setLoading(false)}
          ></img>
        </Link>
      </div>

      <Link className="link card__link" to={link}>
        <span className="card__name">{name}</span>
      </Link>
    </div>
  );
}
