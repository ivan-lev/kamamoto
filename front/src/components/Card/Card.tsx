// React and Redux
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

interface Props {
	link: string;
	name: string;
	image: string;
}

const style = {
	aspectRatio: '3 / 2',
	width: '100%',
	border: '1px solid var(--border-color)',
};

export default function Card({ link, name, image }: Props) {
	const [srcToRender, setSrcToRender] = useState<string>(image);

	return (
		<div className="card">
			<picture className="card__picture" style={ style }>
				<img
					className="card__image"
					alt="Изабражение лота"
					src={ srcToRender }
					onError={ () => setSrcToRender('/images/error.webp') }
				/>
			</picture>

			<span className="card__name">{ name }</span>

			<Link className="link card__link" to={ link } />
		</div>
	);
}
