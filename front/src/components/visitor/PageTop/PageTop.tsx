import { Link, useLocation } from 'react-router';
import './PageTop.scss';

interface Props {
	title?: string;
	subtitle?: string;
	backLink?: string;
}

export default function PageTop({ title, subtitle, backLink }: Props) {
	const location = useLocation().pathname;
	const topLevelPaths = ['/collection/', '/exhibitions/', '/useful/'];

	return title && (
		<section className="section page-top">

			<div className="page-top__breadcrumbs">
				<Link to={ backLink || '..' } className="link link_navigational" relative="path">
					<img className="link__icon" src="/__spritemap#sprite-arrow-left-view" alt="иконка" />
					{ topLevelPaths.includes(location) ? 'На главную' : 'Назад' }
				</Link>
			</div>

			<h1 className="title title--1">{ title }</h1>
			{ subtitle && <p className="subtitle">{ subtitle }</p> }
		</section>
	);
}
