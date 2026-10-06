import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import DisplayGrid from '@/components/visitor/DisplayGrid/DisplayGrid';
import NotFound from '@/components/visitor/NotFound/NotFound';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { setCategories } from '@/slices/visitor/categories';
import { resetCategory, setCategory } from '@/slices/visitor/category';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { api } from '@/utils/api/api';
import { isPageMissing } from '@/utils/api/api.common';
import { scrollToTop } from '@/utils/scrollToTop';

export default function Category() {
	const { category } = useParams();
	const dispatch = useDispatch();
	const categories = useSelector((state: RootState) => state.categories);
	// заголовок берётся из списка категорий в БД; есть ли такая категория, решает 404 от бэка
	const categoryTitle = categories.find(cat => cat.name === category)?.title.toLowerCase();
	const listToDisplay = useSelector((state: RootState) => state.list.displayList);
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	// адрес, по которому категории не оказалось: при переходе на другой адрес страница снова грузится
	const [missingCategory, setMissingCategory] = useState<string>();

	useLayoutEffect(() => scrollToTop(), []);

	// при переходе со страницы коллекции список уже загружен, при прямом заходе — нет
	useEffect(() => {
		if (categories.length > 0)
			return;

		async function fetchCategories() {
			try {
				dispatch(setCategories(await api.categories.getCategories()));
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchCategories();
	}, [dispatch, categories.length]);

	useEffect(() => {
		async function fetchExhibits(name: string) {
			try {
				dispatch(setDisplayList(await api.categories.getExhibitsByCategory(name)));
			}
			catch (error) {
				console.error(error);

				if (isPageMissing(error))
					setMissingCategory(name);
			}
			finally {
				setShowPreloader(false);
			}
		}

		if (category) {
			dispatch(setCategory(category));
			fetchExhibits(category);
		}

		return () => {
			dispatch(resetCategory());
			dispatch(resetDisplayList());
		};
	}, [dispatch, category]);

	return (
		missingCategory === category
			? (<NotFound />)
			: (
				<>
					{ categoryTitle && <Seo title={ `Камамото: ${categoryTitle}` } /> }

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
