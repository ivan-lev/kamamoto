import { Link } from 'react-router';
import './Breadcrumbs.scss';

export default function Breadcrumbs() {
	return (
		<div className="breadcrumbs">
			<Link to="/" className="link link_navigational" relative="path">
				<img className="link__icon" src="/__spritemap#sprite-arrow-left-view" alt="иконка" />
				Назад
			</Link>
		</div>
	);
}
