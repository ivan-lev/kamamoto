import './Menu.scss';

import { NavLink } from 'react-router-dom';

import { menu } from '../../variables/menu';

export default function Menu(): JSX.Element {
  return (
    <ul className="menu">
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
  );
}
