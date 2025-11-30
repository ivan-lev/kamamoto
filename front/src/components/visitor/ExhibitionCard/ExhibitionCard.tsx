import type { Exhibition } from '@/types/exhibitionType';
import { Link } from 'react-router';
import './ExhibitionCard.scss';

interface Props {
	exhibition: Exhibition;
}

export default function ExhibitionCard({ exhibition }: Props) {
	const { id, name, dates, city, place, isActive } = exhibition;
	return isActive
		? (
			<div className="exhibition-card">
				<div className="exhibition-card__top-line">
					<p className="exhibition-card__city">{ city }</p>
					<p className="exhibition-card__dates">{ dates }</p>
				</div>
				<div className="exhibition-card__main-content">
					<p className="exhibition-card__name">{ name }</p>
					<p className="exhibition-card__place">{ place }</p>
				</div>

				<Link className="link exhibition-card__more-link" to={ id.toString() }>Подробнее</Link>
			</div>
		)
		: (
			<div className="exhibition-card">
				<div className="exhibition-card__top-line">
					<p className="exhibition-card__city">{ city }</p>
					<p className="exhibition-card__dates">{ dates }</p>
				</div>
				<div className="exhibition-card__main-content">
					<p className="exhibition-card__name">{ name }</p>
					<p className="exhibition-card__place">{ place }</p>
				</div>
			</div>
		);
}
