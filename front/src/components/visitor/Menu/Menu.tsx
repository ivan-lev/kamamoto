import { NavLink } from 'react-router';
import { links } from '@/variables/links';
import './Menu.scss';

export default function Menu() {
	const { menu } = links;
	return (
		<nav className="menu">
			<ul className="menu__list">
				{ menu.map((link) => {
					return (
						<li key={ link.url }>
							<NavLink
								className={ ({ isActive }) => `menu__link ${isActive ? 'menu__link_active' : ''}` }
								to={ link.url }
							>
								{ link.title }
							</NavLink>
						</li>
					);
				}) }
				<button
					className="link link_navigational menu__search"
					onClick={ () => {} }
				>
					<img className="link__icon" src="/__spritemap#sprite-search-view" alt="иконка" title="В разарботке" />
				</button>
			</ul>

		</nav>
	);
}
