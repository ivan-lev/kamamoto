import { useLayoutEffect } from 'react';
import Card from '@/components/visitor/Card/Card';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { scrollToTop } from '@/utils/scrollToTop';

export default function Useful() {
	const cards = [
		{ link: '/dictionary', title: 'Глоссарий', thumbnail: '/images/useful/dictionary.webp' },
		{ link: '/ceramic-styles/', title: 'Стили керамики', thumbnail: '/images/dummy.webp' },
		{ link: '/japanese-exhibitions', title: 'Японские выставки', thumbnail: '/images/useful/exhibitions/thumbnail.webp' },
		{ link: '/japanese-societies', title: 'Японские керамические сообщества', thumbnail: '/images/useful/societies.webp' },
	];

	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo
				title="Камамото: полезные материалы"
				description="Страница с каталогом ресурсов, содержащих информавцию о японской керамике, известных и легендарных мастерах и предметах"
			/>

			<PageTop title="Полезное" subtitle="Здесь будет полезная информация. На данный момент есть начальная версия глоссария. Раздел со стилями керамики - в разработке." />

			<section className="section">
				<div className="display-grid">
					<ul className="display-grid__list">
						{ cards.map((item) => {
							const { link, title, thumbnail } = item; ;
							return (
								<li className="display-grid__element" key={ title }>
									<Card link={ link } title={ title } image={ thumbnail } />
								</li>
							);
						}) }
					</ul>
				</div>
			</section>
		</>
	);
}
