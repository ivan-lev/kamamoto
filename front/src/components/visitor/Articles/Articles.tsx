import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '@/components/shared/Preloader/Preloader';
import DisplayGrid from '@/components/visitor/DisplayGrid/DisplayGrid';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';

export default function Articles() {
	const dispatch = useDispatch();
	const listToDisplay = useSelector((state: RootState) => state.list.displayList);
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	useLayoutEffect(() => scrollToTop(), []);

	useEffect(() => {
		api.ceramicStyles.getCeramicStylesArticles()
			.then((articles: { name: string, title: string, thumbnail: string }[]) => {
				dispatch(setDisplayList(articles.map(({ name, title, thumbnail }) => ({ link: name, title, thumbnail }))));
				setShowPreloader(false);
			})
			.catch((error) => {
				console.error(error);
				setShowPreloader(false);
			});

		return () => {
			dispatch(resetDisplayList());
		};
	}, []);

	return (
		<>
			<PageTop title="Стили керамики" subtitle="" backLink="/useful/" />

			<Seo title="Камамото: стили керамики" description="Страница со списком стилей керамики" />

			<section className="section">
				{ listToDisplay.length === 0 && showPreloader
					? (
						<Preloader />
					)
					: (
						<DisplayGrid />
					) }
			</section>
		</>
	);
}
