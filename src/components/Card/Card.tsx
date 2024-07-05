import './Card.scss';

import { Link } from 'react-router-dom';

export default function Card({
  link,
  name,
  image
}: {
  link: string;
  name: string;
  image: string;
}): JSX.Element {
  return (
    <div className="card">
      <Link className="link" to={link}>
        <img className="card__image" src={image}></img>
      </Link>
      <Link className="link card__link" to={link}>
        <span className="card__name">{name}</span>
      </Link>
    </div>
  );
}
