import type { Incense } from '@/variables/incences.types';
import Card from '@/components/Card/Card';
import './DisplayGrid.scss';

interface Props {
	cards: Incense[];
	nothingFoundMessage: string;
}

export default function DisplayGrid({ cards, nothingFoundMessage }: Props) {
	return (
		<div className="display-grid">
			{ !cards.length
				? <p className="title title--3">{ nothingFoundMessage }</p>
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
