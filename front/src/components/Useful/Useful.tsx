import Card from '@/components/Card/Card';
import PageTop from '@/components/PageTop/PageTop';

import Seo from '@/components/Seo/Seo';

export default function Useful() {
	const cards = [
		{ link: 'glossary', title: 'Глоссарий', thumbnail: '/images/useful/glossary.webp' },
		{ link: '', title: 'Стили керамики', thumbnail: '/images/dummy.webp' },
	];

	return (
		<>
			<Seo title="Камамото: полезные материалы" description="Страница с каталогом ресурсов, содержащих информавцию о японской керамике, известных и легендарных мастерах и предметах" />

			<PageTop title="Полезное" subtitle="Здесь будет полезная информация. На данный момент есть начальная версия глоссария. Раздел со стилями керамики - в разработке." />

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
