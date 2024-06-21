import './Logo.scss';

import { NavLink } from 'react-router-dom';

export default function Logo(): JSX.Element {
  return (
    <NavLink className="logo" to="/">
      <img className="logo__link" src="logo.png" alt="logo"></img>
    </NavLink>
  );
}
