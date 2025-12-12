import type { Incense } from '@/variables/incences.types';
import { Link } from 'react-router';
import './Card.scss';

interface Props {
	card: Incense;
}

const style = {
	aspectRatio: '3 / 2',
	width: '100%',
	border: '1px solid var(--border-color)',
};

export default function Card({ card }: Props) {
	const base = import.meta.env.BASE_URL;

	return (
		<div className="card">
			<picture className="card__picture" style={ style }>
				<img
					className="card__image"
					alt="Изабражение лота"
					src={ `${base}images/incenses/${card.manufacturer.slug}/${card.slug}/${card.photos[0]}` }
				/>
			</picture>

			<span className="card__name">
				{ `${card.title} | ${card.manufacturer.title}` }
			</span>

			<Link className="link card__link" to={ `${card.manufacturer.slug}/${card.slug}` } />
		</div>
	);
}
