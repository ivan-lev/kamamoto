import type { ChangeEvent, FormEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import Seo from '@/components/Seo/Seo';
import { login, logout } from '@/slices/admin/user';
import { api } from '@/utils/api/api';
import { LOGIN_MESSAGES } from '@/variables/variables';
import './Login.scss';

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const isLoggedIn = useSelector((state: AdminRootState) => state.admin.isLoggedIn);

	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [isMessageSending, setIsMessageSending] = useState<boolean>(false);
	const [loginError, setLoginError] = useState<string>('');
	const [isPasswordShowed, setIsPasswordShowed] = useState(false);
	const [values, setValues] = useState({ email: '', password: '' });
	const { email, password } = values;

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.auth.checkToken(token)
				.catch((error) => {
					console.error(LOGIN_MESSAGES.TOKEN_ERROR, error);
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
		setIsFormDisabled(true);
		setIsMessageSending(true);
		api.auth.authorize(email, password)
			.then((response) => {
				dispatch(login(response.token));
				setIsFormDisabled(false);
				setIsMessageSending(false);
				navigate('/admin/');
			})
			.catch((error) => {
				console.error(error);
				const errorStatus = error.status;
				switch (errorStatus) {
					case 400:
						setLoginError(LOGIN_MESSAGES.WRONG_EMAIL_FORMAT);
						break;
					case 401:
						setLoginError(LOGIN_MESSAGES.WRONG_CREDEINTIALS);
						break;
					case 500:
						setLoginError(LOGIN_MESSAGES.LOGIN_ERROR);
						break;
					default:
						setLoginError('Неизвестная ошибка');
				}
				setIsFormDisabled(false);
				setIsMessageSending(false);
				return error.status;
			});
	};

	return (
		<>
			<Seo title="Камамото: страница логина" />

			<div className="login">
				<form
					name="login__form"
					className="container login__form"
					autoComplete="off"
					onSubmit={ handleLogin }
				>
					<Logo />
					<fieldset className="login__fieldset" disabled={ isFormDisabled }>
						<div className="login__submit-block">
							<label htmlFor="email" className="login__label">
								Email
							</label>
							<input
								className={ `input ${
									isMessageSending ? 'input_disabled' : ''
								}` }
								type="email"
								name="email"
								id="email"
								placeholder="Введите email"
								autoComplete="none"
								required
								value={ email }
								onChange={ handleChange }
								autoFocus
							/>
						</div>

						<div className="login__submit-block">
							<label htmlFor="password" className="login__label">
								Пароль
							</label>
							<div className="login__password-block">
								<input
									className={ `login__password-input input ${
										isMessageSending ? 'input_disabled' : ''
									}` }
									type={ !isPasswordShowed ? 'password' : 'text' }
									name="password"
									id="password"
									placeholder="Введите пароль"
									autoComplete="none"
									required
									value={ password }
									onChange={ handleChange }
								/>
								<button
									className="login__button_show-password"
									type="button"
									onClick={ () => setIsPasswordShowed(!isPasswordShowed) }
								>
									{ isPasswordShowed
										? (
											<img className="login__button-img" src="/icons/eye-opened.svg"></img>
										)
										: (
											<img className="login__button-img" src="/icons/eye-closed.svg"></img>
										) }
								</button>
							</div>
						</div>

						<div className="login__submit-block">
							<button
								className={ `button login__button ${isMessageSending ? 'button--sending' : ''} ${isFormDisabled ? 'button--muted' : ''}` }
								type="submit"
							>
								Войти
							</button>
							<span className="login__error-message">{ loginError }</span>
						</div>
					</fieldset>
				</form>
			</div>
		</>
	);
}
