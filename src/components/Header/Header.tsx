import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';

import './Header.scss';

export default function Header(): JSX.Element {
  return (
    <header className="header bordered">
      <Logo />
      <Menu />
    </header>
  );
}
