import './Menu.scss';

import { NavLink } from 'react-router-dom';

import { menu } from '../../variables/menu';

export default function Menu(): JSX.Element {
  return (
    <nav className="menu">
      <ul className="menu__list">
        {menu.map(element => {
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
