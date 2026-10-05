import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import DisplayGrid from '@/components/visitor/DisplayGrid/DisplayGrid';
import NotFound from '@/components/visitor/NotFound/NotFound';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { resetCategory, setCategory } from '@/slices/visitor/category';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { api } from '@/utils/api/api';
import { isPageMissing } from '@/utils/api/api.common';
import { scrollToTop } from '@/utils/scrollToTop';
import { CATEGORIES } from '@/variables/variables';

export default function Category() {
	const { category } = useParams();
	const dispatch = useDispatch();
	const allowedCategory = Object.keys(CATEGORIES).includes(category || '');

	const categoryTitle = allowedCategory ? CATEGORIES[category!].toLowerCase() : 'японская керамика';
	const listToDisplay = useSelector((state: RootState) => state.list.displayList);
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	// адрес, по которому категории не оказалось: при переходе на другой адрес страница снова грузится
	const [missingCategory, setMissingCategory] = useState<string>();

	useLayoutEffect(() => scrollToTop(), []);

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

					if (isPageMissing(error))
						setMissingCategory(category);
				});
		}

		return () => {
			dispatch(resetCategory());
			dispatch(resetDisplayList());
		};
	}, [dispatch, category]);

	return (
		!allowedCategory || missingCategory === category
			? (<NotFound />)
			: (
				<>
					<Seo title={ `Камамото: ${categoryTitle}` } />

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
