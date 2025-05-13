import { Link } from 'react-router-dom';
import './Breadcrumbs.scss';

export default function Breadcrumbs() {
	return (
		<div className="breadcrumbs">
			<Link to=".." className="link link_navigational" relative="path">
				<img
					className="link__icon"
					src="/icons/link-arrow-left.svg"
				/>
				Назад
			</Link>
		</div>
	);
}
