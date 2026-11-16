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
import { PATHS } from '@/variables/variables';

export default function MeibutsuList() {
	const dispatch = useDispatch();
	const listToDisplay = useSelector((state: RootState) => state.list.displayList);
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	useLayoutEffect(() => scrollToTop(), []);

	useEffect(() => {
		async function fetchMeibutsu() {
			try {
				const response = await api.meibutsu.getMeibutsuArticles();
				dispatch(setDisplayList(response.map(({ id, name, photo }) => ({ link: `/${PATHS.MEIBUTSU}/${id}`, title: name, thumbnail: photo }))));
			}
			catch (error) {
				console.error(error);
			}
			finally {
				setShowPreloader(false);
			}
		}

		fetchMeibutsu();

		return () => {
			dispatch(resetDisplayList());
		};
	}, [dispatch]);

	return (
		<>
			<Seo title="Камамото: вещи с именем" />

			<PageTop
				title="Вещи с именем"
				subtitle="Мэйбуцу (名物) — «прославленные вещи»: предметы чайной утвари, которые получили собственные имена и известность благодаря мастерам, владельцам и историям о них. Здесь собираются статьи о таких вещах."
				backLink="/useful/"
			/>

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
