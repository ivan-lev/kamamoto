// Types
import type { AdminRootState } from '../../slices/adminSlice';

// React and Redux
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../slices/adminSlice';

// Components
import Logo from '../Logo/Logo';
import Seo from '../Seo/Seo';

// Utils and variables
import { api } from '../../utils/api';
import { LOGIN_MESSAGES } from '../../variables/variables';

import './Admin.scss';

export default function Admin(): JSX.Element {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: AdminRootState) => state.admin.isLoggedIn);

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api
				.checkToken(token)
				.catch((error) => {
					console.error(LOGIN_MESSAGES.TOKEN_ERROR, error);
					dispatch(logout());
					navigate('/login/');
				});
		}
	}, []);

	return (
		<>
			<Seo title="Камамото: статистика" />

			{isLoggedIn
				? (
						<section className="admin">
							<div className="admin__sidebar bordered background-muted">
								<Logo />
								<ul className="admin__list">
									<li>
										<Link to="/admin/" className="link">
											Статистика
										</Link>
									</li>
								</ul>
								<ul className="admin__list">
									<li>
										<Link to="categories/" className="link">
											Категории
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
									<li>
										<Link to="letters/" className="link">
											Благодарственные письма
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

								<button
									className="button"
									onClick={() => {
										dispatch(logout());
										navigate('/login');
									}}
								>
									Выйти
								</button>
							</div>

							<div className="admin__content bordered background-muted">
								<Outlet />
							</div>
						</section>
					)
				: (
						<Navigate to="/login/" replace />
					)}
		</>
	);
}
