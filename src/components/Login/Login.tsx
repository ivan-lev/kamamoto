import './Login.scss';

// React
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { AdminRootState, login, logout } from '../../slices/adminSlice';

// Components
import Logo from '../Logo/Logo';

// Utils
import { api } from '../../utils/api';

// Variables
import { LOGIN_MESSAGES } from '../../variables/variables';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state: AdminRootState) => state.admin.isLoggedIn);

  const [loginError, setLoginError] = useState<string>('');
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [values, setValues] = useState({ email: '', password: '' });
  const { email, password } = values;

  useEffect(() => {
    const token = localStorage.getItem('kmmttkn');
    if (token) {
      api
        .checkToken(token)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(LOGIN_MESSAGES.TOKEN_ERROR, error);
          dispatch(logout());
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/admin/');
    }
  }, [isLoggedIn]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .authorize(email, password)
      .then(response => {
        dispatch(login(response.token));
        navigate('/admin/');
      })
      .catch(error => {
        console.log(error);
        const errorStatus = error.status;
        switch (errorStatus) {
          case 401:
            setLoginError(LOGIN_MESSAGES.WRONG_CREDEINTIALS);
            break;
          case 500:
            setLoginError(LOGIN_MESSAGES.LOGIN_ERROR);
            break;
          default:
            setLoginError('Неизвестная ошибка');
        }
        return error.status;
      });
  };

  return (
    <div className="login">
      <form
        name="login__form"
        className="bordered background-muted container login__form"
        autoComplete="off"
        onSubmit={handleLogin}
      >
        <Logo />
        <fieldset className="login__fieldset" disabled={false}>
          <div className="login__submit-block">
            <label htmlFor="email" className="muted login__label">
              Email
            </label>
            <input
              className="background-muted bordered input"
              type="email"
              name="email"
              id="email"
              placeholder="Введите email"
              autoComplete="none"
              required
              value={email}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="login__submit-block">
            <label htmlFor="password" className="muted login__label">
              Пароль
            </label>
            <div className="login__password-block">
              <input
                className="background-muted bordered input login__password-input"
                type={!isPasswordShowed ? 'password' : 'text'}
                name="password"
                id="password"
                placeholder="Введите пароль"
                autoComplete="none"
                required
                value={password}
                onChange={handleChange}
              />
              <button
                className="muted login__button_show-password"
                type="button"
                onClick={() => setIsPasswordShowed(!isPasswordShowed)}
              >
                {isPasswordShowed ? (
                  <img className="login__button-img" src="/public/icons/eye-opened.svg"></img>
                ) : (
                  <img className="login__button-img" src="/public/icons/eye-closed.svg"></img>
                )}
              </button>
            </div>
          </div>

          <div className="login__submit-block">
            <button className="button login__button" type="submit">
              Войти
            </button>
            <span className="login__error-message">{loginError}</span>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
