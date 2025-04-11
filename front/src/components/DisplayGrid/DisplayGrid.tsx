import type { RootState } from '@/slices/visitor';
import Card from '@/components/Card/Card';
import { useSelector } from 'react-redux';
import './DisplayGrid.scss';

export default function DisplayGrid() {
	const displayList = useSelector((state: RootState) => state.list.displayList);

	return (
		<div className="display-grid">
			<ul className="display-grid__list">
				{displayList.length !== 0
				&& displayList.map((item, index) => {
					const { link, title, thumbnail } = item; ;
					return (
						<li className="display-grid__element" key={index}>
							<Card link={link} name={title} image={thumbnail} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
