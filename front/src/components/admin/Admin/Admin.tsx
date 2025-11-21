import type { RootState } from '@/slices/admin/index';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, Outlet, useNavigate } from 'react-router';
import Logo from '@/components/Logo/Logo';
import Seo from '@/components/Seo/Seo';
import { logout } from '@/slices/admin/user';
import { api } from '@/utils/api/api';
import { LOGIN_MESSAGES } from '@/variables/variables';
import './Admin.scss';

export default function Admin() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.auth.checkToken(token)
				.catch((error) => {
					console.error(LOGIN_MESSAGES.TOKEN_ERROR, error);
					dispatch(logout());
					navigate('/login/');
				});
		}
	}, []);

	const listOne = [
		{ title: 'Лоты', path: 'exhibits/' },
		{ title: 'Категории', path: 'categories/' },
		{ title: 'Стили керамики', path: 'ceramic-styles/' },
		{ title: 'Комплектация', path: 'complectation/' },
		{ title: 'Гончары', path: 'potters/' },
	];

	const listTwo = [
		{ title: 'Выставки', path: 'exhibitions/' },
		{ title: 'Партнёры', path: 'partners/' },
		{ title: 'Благодарственные письма', path: 'letters/' },
		// { title: 'Файлы для скачивания (sic)', path: 'files/' },
	];

	return (
		<>
			<Seo title="Камамото: статистика" />

			{ isLoggedIn
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
								{ listOne.map((item) => {
									return (
										<li key={ item.path }>
											<Link to={ item.path } className="link">
												{ item.title }
											</Link>
										</li>
									);
								}) }
							</ul>

							<ul className="admin__list">
								{ listTwo.map((item) => {
									return (
										<li key={ item.path }>
											<Link to={ item.path } className="link">
												{ item.title }
											</Link>
										</li>
									);
								}) }
							</ul>

							<button
								className="button"
								onClick={ () => {
									dispatch(logout());
									navigate('/login');
								} }
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
				) }
		</>
	);
}
