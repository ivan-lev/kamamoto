// React and Redux
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Card.scss';

interface Props {
	link: string;
	name: string;
	image: string;
}

export default function Card({ link, name, image }: Props) {
	const [loading, setLoading] = useState(true);

	return (
		<div className="card">
			<div className="card__image-wrapper">
				{ loading && <img className="card__preloader" alt="Exhibit preview" src="/__spritemap#sprite-preloader-view"></img> }
				<img
					className="card__image"
					alt="Exhibit preview"
					src={ image }
					onLoad={ () => setLoading(false) }
				>
				</img>
			</div>

			<span className="card__name">{ name }</span>

			<Link className="link card__link" to={ link } />
		</div>
	);
}
