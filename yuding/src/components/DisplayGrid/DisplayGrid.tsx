import type { Incense } from '@/variables/incences.types';
import Card from '@/components/Card/Card';
import './DisplayGrid.scss';

export default function DisplayGrid({ cards }: { cards: Incense[] }) {
	return (
		<div className="display-grid">
			{ !cards.length
				? <p className="title title--3">Ничего не найдено</p>
				: (
					<ul className="display-grid__list">
						{ cards.map((card) => {
							return (
								<li className="display-grid__element" key={ card.title }>
									<Card card={ card } />
								</li>
							);
						}) }
					</ul>
				) }
		</div>
	);
}
