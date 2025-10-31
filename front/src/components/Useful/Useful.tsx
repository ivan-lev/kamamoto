import Card from '@/components/Card/Card';
import PageTop from '@/components/PageTop/PageTop';

import Seo from '@/components/Seo/Seo';

export default function Useful() {
	const cards = [
		{ link: '', title: 'Глоссарий', thumbnail: '/images/dummy.webp' },
		{ link: '', title: 'Стили керамики', thumbnail: '/images/dummy.webp' },
	];

	return (
		<>
			<Seo title="Камамото: коллекция японской керамики" />

			<PageTop title="Полезное" />
			<section className="section">
				<p>Здесь будет полезная информация. Ссылки не кликабельны и пока никуда не ведут.</p>
			</section>
			<section className="section">
				<div className="display-grid">
					<ul className="display-grid__list">
						{ cards.map((item) => {
							const { link, title, thumbnail } = item; ;
							return (
								<li className="display-grid__element" key={ title }>
									<Card link={ link } name={ title } image={ thumbnail } />
								</li>
							);
						}) }
					</ul>
				</div>
			</section>
		</>
	);
}
