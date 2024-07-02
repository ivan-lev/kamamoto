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
    <div className="category__item">
      <Link className="link" to={link} onClick={onClick}>
        <img className="category__item-image" src={image}></img>
      </Link>
      <Link className="link category__link" to={link} onClick={onClick}>
        {name}
      </Link>
    </div>
  );
}
