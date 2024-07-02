import './Card.scss';

import { Link } from 'react-router-dom';

export default function Card({
  link,
  name,
  image,
  onClick
}: {
  link: string;
  name: string;
  image: string;
  onClick: any;
}): JSX.Element {
  return (
    <div className="card">
      <Link className="link" to={link} onClick={onClick}>
        <img className="card__image" src={image}></img>
      </Link>
      <Link className="link card__link" to={link} onClick={onClick}>
        <span className="card__name">{name}</span>
      </Link>
    </div>
  );
}
