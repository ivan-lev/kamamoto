import './Admin.scss';

//React
import { useEffect } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { AdminRootState, logout } from '../../slices/adminSlice';

// Utils
import { api } from '../../utils/api';

// Variables
import { LOGIN_MESSAGES } from '../../variables/variables';

//Components
import Logo from '../Logo/Logo';
import Seo from '../Seo/Seo';

export default function Admin(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: AdminRootState) => state.admin.isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .checkToken(token)
        .then(response => {
          console.log(response.answer);
        })
        .catch(error => {
          console.log(LOGIN_MESSAGES.TOKEN_ERROR, error);
          dispatch(logout());
          navigate('/login/');
        });
    }
  }, []);

  return (
    <>
      <Seo title="Камамото: статистика" />

      {isLoggedIn ? (
        <section className="admin">
          <div className="admin__sidebar bordered background-muted">
            <Logo />
            <ul className="admin__list">
              <li>
                <Link to="/admin/" className="link">
                  Статистика
                </Link>
              </li>
              <li>
                <Link to="exhibits/" className="link">
                  Лоты
                </Link>
              </li>
              <li>
                <Link to="exhibitions/" className="link">
                  Выставки
                </Link>
              </li>
              <li>
                <Link to="partners/" className="link">
                  Партнёры
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

            <ul className="admin__list">
              <li>
                <button
                  className="button"
                  onClick={() => {
                    dispatch(logout());
                    navigate('/login');
                  }}
                >
                  Выйти
                </button>
              </li>
            </ul>
          </div>

          <div className="admin__content bordered background-muted">
            <Outlet />
          </div>
        </section>
      ) : (
        <Navigate to="/login/" replace />
      )}
    </>
  );
}
