import './Admin.scss';

import { Link, Outlet } from 'react-router-dom';

import Logo from '../Logo/Logo';

export default function Admin(): JSX.Element {
  return (
    <section className="admin">
      <div className="admin__sidebar bordered background-muted">
        <Logo />
        <ul className="admin__list">
          <li>
            <Link to="/admin" className="link">
              Статистика
            </Link>
          </li>
          <li>
            <Link to="exhibits/" className="link">
              Все лоты
            </Link>
          </li>
          <li>
            <Link to="exhibitions/" className="link">
              Выставки
            </Link>
          </li>
        </ul>

        <ul className="admin__list">
          <li>
            <Link to="#" className="link">
              Добавить лот
            </Link>
          </li>
          <li>
            <Link to="#" className="link">
              Добавить выставку
            </Link>
          </li>
          <li>
            <Link to="#" className="link">
              Изменить лот
            </Link>
          </li>
        </ul>
      </div>

      <div className="admin__content bordered background-muted">
        <Outlet />
      </div>
    </section>
  );
}
