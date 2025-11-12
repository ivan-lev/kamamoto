import { Link } from 'react-router-dom';
import Seo from '@/components/Seo/Seo';
import './NotFound.scss';

export default function NotFound() {
	return (
		<>
			<Seo title="Камамото: страница не найдена" description="Страница, которая открывается, если ссылка не существует или не активна" />

			<section className="section">
				<div className="not-found">
					<span className="not-found__text">Страница не найдена 👺</span>
					<Link to="/" className="not-found__back-link">На главную</Link>
					<a className="link link--muted not-found__image-source-link" href="https://www.tokoname-kankou.net/en/spot/detail/9/">Источник фото</a>
				</div>
			</section>
		</>
	);
}
