import type { RootState } from '@/slices/admin/index';
import Logo from '@/components/Logo/Logo';
import Seo from '@/components/Seo/Seo';
import { logout } from '@/slices/admin/user';
import { api } from '@/utils/api/api';
import { LOGIN_MESSAGES } from '@/variables/variables';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import './Admin.scss';

export default function Admin(): JSX.Element {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

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
							<div className="admin__sidebar">
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
									<li>
										<Link to="files/" className="link">
											Файлы для скачивания
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

							<div className="admin__content">
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
