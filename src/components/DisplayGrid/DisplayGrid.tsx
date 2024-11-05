// Types
import type { RootState } from '../../slices';

// React and Redux
import { useSelector } from 'react-redux';

// Components
import Card from '../Card/Card';

import './DisplayGrid.scss';

export default function DisplayGrid(): JSX.Element {
	const displayList = useSelector((state: RootState) => state.list.displayList);

	return (
		<div className="display-grid">
			<ul className="display-grid__list">
				{displayList.length !== 0
				&& displayList.map((item, index) => {
					const { link, title, thumb } = item; ;
					return (
						<li className="display-grid__element" key={index}>
							<Card link={link} name={title} image={thumb} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
