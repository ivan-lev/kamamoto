import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router';
import DisplayGrid from '@/components/DisplayGrid/DisplayGrid';
import PageTop from '@/components/PageTop/PageTop';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { resetCategory, setCategory } from '@/slices/visitor/category';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { api } from '@/utils/api/api';
import { CATEGORIES, PATHS } from '@/variables/variables';

export default function Category() {
	const { category } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const allowedCategory = Object.keys(CATEGORIES).includes(category || '');

	const categoryTitle = allowedCategory ? CATEGORIES[category!].toLowerCase() : 'японская керамика';
	const listToDisplay = useSelector((state: RootState) => state.list.displayList);
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
		!allowedCategory
			? (<Navigate to="/404" replace />)
			: (
				<>
					<Seo
						title={ `Камамото: ${categoryTitle}` }
						description={ `Страница с каталогом предметов из категории ${categoryTitle.toLowerCase()}` }
						canonicalUrl={ `${PATHS.COLLECTION}/${category}/` }
					/>

					<PageTop title={ categoryTitle } />

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
			)
	);
}
