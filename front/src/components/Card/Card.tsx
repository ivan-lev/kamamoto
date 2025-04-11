// React and Redux
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';
import preloader from '/icons/preloader.svg';

export default function Card({
	link,
	name,
	image,
}: {
	link: string;
	name: string;
	image: string;
}) {
	const [loading, setLoading] = useState(true);

	return (
		<div className="card">
			<div className="card__image-wrapper">
				{loading && <img className="card__preloader" alt="Exhibit preview" src={preloader}></img>}
				<Link className="link" to={link} style={{ display: loading ? 'none' : 'flex' }}>
					<img
						className="card__image"
						alt="Exhibit preview"
						src={image}
						onLoad={() => setLoading(false)}
					>
					</img>
				</Link>
			</div>

			<Link className="link card__link" to={link}>
				<span className="card__name">{name}</span>
			</Link>
		</div>
	);
}
