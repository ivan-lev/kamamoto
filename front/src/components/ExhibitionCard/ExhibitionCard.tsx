import type { Exhibition } from '@/types/exhibitionType';
import { Link } from 'react-router-dom';
import './ExhibitionCard.scss';

interface Props {
	exhibition: Exhibition;
}

export default function ExhibitionCard({ exhibition }: Props) {
	const { id, name, dates, city, place, isActive } = exhibition;
	return (
		<>
			<div className="exhibition-card">
				<p className="exhibition-card__dates">{dates}</p>
				<p className="exhibition-card__city">{city}</p>
				<div className="exhibition-card__main-content">
					<p className="exhibition-card__name">{name}</p>
					<p className="exhibition-card__place">{place}</p>
				</div>
				{isActive && (
					<Link className="link link--muted exhibition-card__more-link" to={id.toString()}>
						Подробнее
					</Link>
				)}
			</div>
		</>
	);
}
