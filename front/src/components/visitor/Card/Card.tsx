// React and Redux
import { useState } from 'react';
import { Link } from 'react-router';
import './Card.scss';

interface Props {
	link: string;
	title: string;
	image: string;
}

const style = {
	aspectRatio: '3 / 2',
	width: '100%',
	border: '1px solid var(--border-color)',
};

export default function Card({ link, title, image }: Props) {
	const [srcToRender, setSrcToRender] = useState<string>(image);

	return (
		<div className="card">
			<picture className="card__picture" style={ style }>
				<img
					className="card__image"
					alt="Изабражение лота"
					src={ srcToRender || '/images/error.webp' }
					onError={ () => setSrcToRender('/images/error.webp') }
				/>
			</picture>

			<span className="card__name">{ title }</span>

			<Link className="link card__link" to={ link } />
		</div>
	);
}
