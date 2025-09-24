import { Link, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';

export default function Breadcrumbs() {
	const location = useLocation();

	return (
		<div className="breadcrumbs">
			<Link to=".." className="link link_navigational" relative="path">
				<img className="link__icon" src="/__spritemap#sprite-arrow-left-view" alt="иконка" />
				{ location.pathname === '/collection' ? 'На главную' : 'Назад' }
			</Link>
		</div>
	);
}
