import './Header.scss';

import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';

export default function Header(): JSX.Element {
  return (
    <header className="header bordered">
      <Logo />
      <Menu />
    </header>
  );
}
