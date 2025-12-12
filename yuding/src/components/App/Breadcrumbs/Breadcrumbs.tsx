import { Link, useLocation } from 'react-router';
import './Breadcrumbs.scss';

export default function Breadcrumbs() {
	const location = useLocation().pathname;
	const topLevelPaths = ['/collection/', '/exhibitions/', '/useful/'];

	return (
		<div className="breadcrumbs">
			<Link to="/" className="link link_navigational" relative="path">
				<img className="link__icon" src="/__spritemap#sprite-arrow-left-view" alt="иконка" />
				{ topLevelPaths.includes(location) ? 'На главную' : 'Назад' }
			</Link>
		</div>
	);
}
