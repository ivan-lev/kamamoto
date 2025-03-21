import type { Exhibition } from '@/types/exhibitionType';
import { Link } from 'react-router-dom';
import './ExhibitionCard.scss';

export default function ExhibitionCard({ exhibition }: { exhibition: Exhibition }): JSX.Element {
	const { id, name, dates, city, place, isActive } = exhibition;
	return (
		<>
			{/* <div className="exhibition-card__upper-line"></div>
			<div className="exhibition-card__year">{year}</div>
			<div className="exhibition-card__lower-line"></div> */}
			<div className="exhibition-card">
				<p className="background-muted bordered exhibition-card__dates">{dates}</p>
				<p className="exhibition-card__city">{city}</p>
				<div className="exhibition-card__main-content">
					<p className="exhibition-card__name">{name}</p>
					<p className="exhibition-card__place">{place}</p>
				</div>
				{isActive && (
					<Link className="link muted exhibition-card__more-link" to={id.toString()}>
						Подробнее
					</Link>
				)}
			</div>
		</>
	);
}
