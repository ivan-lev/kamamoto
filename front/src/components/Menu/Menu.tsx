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
			</ul>
		</nav>
	);
}
