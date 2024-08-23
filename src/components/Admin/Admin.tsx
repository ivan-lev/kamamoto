import './Admin.scss';

import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

import { api } from '../../utils/api';

import type { Exhibits } from '../../types/exhibitType';

export default function Admin(): JSX.Element {
  // const [exhibits, setExhibits] = useState<Exhibits>([]);
  // useEffect(() => {
  //   api.getExhibits().then(response => {
  //     setExhibits(response);
  //     console.log(response);
  //   });
  // }, []);
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
        {/* {exhibits.map(exhibit => (
          <div key={exhibit.id}>
            {exhibit.id} {exhibit.name} {exhibit.category} {exhibit.style}
          </div>
        ))} */}
        <Outlet />
      </div>
    </section>
  );
}
