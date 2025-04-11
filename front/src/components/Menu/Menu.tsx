import { menu } from '@/variables/menu';
import { NavLink } from 'react-router-dom';
import './Menu.scss';

export default function Menu() {
	return (
		<nav className="menu">
			<ul className="menu__list">
				{menu.map((element) => {
					return (
						<li key={element.name}>
							<NavLink
								className={({ isActive }) => `menu__link ${isActive ? 'menu__link_active' : ''}`}
								to={element.link}
							>
								{element.name}
							</NavLink>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
