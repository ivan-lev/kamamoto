import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import DisplayGrid from '@/components/visitor/DisplayGrid/DisplayGrid';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';

export default function LNTPotters() {
	const { category } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const listToDisplay = useSelector((state: RootState) => state.list.displayList);
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	useLayoutEffect(() => scrollToTop(), []);

	useEffect(() => {
		async function fetchLNTPotters() {
			try {
				const response = await api.potters.getLNTPotters();
				dispatch(setDisplayList(response));
				setShowPreloader(false);
			}
			catch (error: any) {
				console.error(error);
				setShowPreloader(false);

				if (error.status === 404) {
					navigate('/404', { replace: true });
				}
			}
		}

		fetchLNTPotters();

		return () => {
			dispatch(resetDisplayList());
		};
	}, [category, dispatch, navigate]);

	return (
		<>
			<Seo
				title="Камамото: Живые национальные сокровища"
				description="Страница со списокм Живых национальных сокровищ"
			/>

			<PageTop title="Живые национальные сокровища" subtitle="В этом списке будет информация о лицах и группах, признанных японским Министерством образования, культуры, спорта, науки и технологий  'Живыми национальными сокровищами' в категории 'гончарное дело' японских ремесел (工芸技術, Когэй Гидзюцу). Представители ремесленных профессий могут претендовать на признание либо индивидуально, либо в составе группы (сертификация группы по сохранению ремесел)." backLink="/useful/" />

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
