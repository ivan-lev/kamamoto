import { useEffect, useLayoutEffect, useState } from 'react';
import Card from '@/components/visitor/Card/Card';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';

export default function Articles() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [articles, setArticles] = useState<{ name: string, title: string, thumbnail: string }[]>([]);

	async function getArticles() {
		try {
			const articles = await api.ceramicStyles.getCeramicStylesArticles();
			setArticles(articles);
			setShowPreloader(false);
		}
		catch (error) { console.error(error); }
	}

	useEffect(() => {
		getArticles();
	}, []);

	useLayoutEffect(() => {
		scrollToTop();
	});

	return (
		<>
			<PageTop title="Стили керамики" subtitle="" backLink="/useful/" />

			<Seo title="Камамото: стили керамики" description="Страница со списком стилей керамики" />

			<section className="section">
				{ showPreloader
					? (
						<Preloader />
					)
					: (
						<div className="display-grid">
							<ul className="display-grid__list">
								{ articles.length !== 0
									&& articles.map((article) => {
										const { name, title, thumbnail } = article; ;
										return (
											<li className="display-grid__element" key={ name }>
												<Card link={ name } title={ title } image={ thumbnail } />
											</li>
										);
									}) }
							</ul>
						</div>
					) }
			</section>
		</>
	);
}
