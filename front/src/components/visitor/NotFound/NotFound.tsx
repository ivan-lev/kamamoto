import { Link } from 'react-router';
import Footer from '@/components/visitor/Footer/Footer';
import Header from '@/components/visitor/Header/Header';
import Seo from '@/components/visitor/Seo/Seo';
import './NotFound.scss';

export default function NotFound() {
	return (
		<>
			<Seo title="Камамото: страница не найдена" description="Страница не найдена и вас переправили сюда" />
			<meta name="robots" content="noindex" />

			<Header />
			<section className="section">
				<div className="not-found">
					<span className="not-found__text title title--1">Страница не найдена 👺</span>
					<Link to="/" className="not-found__back-link">На главную</Link>
					<a className="link link--muted not-found__image-source-link" href="https://www.tokoname-kankou.net/en/spot/detail/9/">Источник фото</a>
				</div>
			</section>
			<Footer />

		</>
	);
}
