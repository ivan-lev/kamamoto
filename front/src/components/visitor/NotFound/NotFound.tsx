import { Link } from 'react-router';
import Seo from '@/components/visitor/Seo/Seo';
import './NotFound.scss';

// Рисуется по исходному адресу, без редиректа на /404: и маршрутом `*`, и страницами записей, если записи нет.
// HTTP-статус 404 для этих адресов ставит бэк (back/src/controllers/pages.ts)
export default function NotFound() {
	return (
		<>
			<Seo title="Камамото: страница не найдена" />
			<meta name="robots" content="noindex" />

			<section className="section">
				<div className="not-found">
					<span className="not-found__text title title--1">Страница не найдена 👺</span>
					<Link to="/" className="not-found__back-link">На главную</Link>
					<a className="link link--muted not-found__image-source-link" href="https://www.tokoname-kankou.net/en/spot/detail/9/">Источник фото</a>
				</div>
			</section>
		</>
	);
}
