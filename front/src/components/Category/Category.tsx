import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DisplayGrid from '@/components/DisplayGrid/DisplayGrid';
import PageTop from '@/components/PageTop/PageTop';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { resetCategory, setCategory } from '@/slices/visitor/category';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { ExhibitCategory } from '@/types/exhibitCategory';
import { api } from '@/utils/api/api';

export default function Category() {
	const category = useParams().category;
	const categoryName = ExhibitCategory[category as keyof typeof ExhibitCategory];
	const dispatch = useDispatch();
	const listToDisplay = useSelector((state: RootState) => state.list.displayList);
	const navigate = useNavigate();

	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	});

	useEffect(() => {
		if (category) {
			dispatch(setCategory(category));
			api.categories.getExhibitsByCategory(category)
				.then((response) => {
					dispatch(setDisplayList(response));
					setShowPreloader(false);
				})
				.catch((error) => {
					console.error(error);
					setShowPreloader(false);

					if (error.status === 404) {
						navigate('/404', { replace: true });
					}
				});
		}

		return () => {
			dispatch(resetCategory());
			dispatch(resetDisplayList());
		};
	}, [category]);

	return (
		<>
			<Seo
				title={ `Камамото: ${categoryName ? categoryName.toLowerCase() : 'японская керамика'}` }
				description={ `Страница с каталогом предметов из категории ${categoryName.toLowerCase()}` }
			/>

			<PageTop title={ categoryName } />

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
