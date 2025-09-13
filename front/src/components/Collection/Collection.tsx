import type { RootState } from '@/slices/visitor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayGrid from '@/components/DisplayGrid/DisplayGrid';
import PageTop from '@/components/PageTop/PageTop';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { setCategories } from '@/slices/visitor/categories';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { api } from '@/utils/api/api';

export default function Collection() {
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const categories = useSelector((state: RootState) => state.categories);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		const listToDisplay = categories.map((cat) => {
			const { name, title, thumbnail } = cat;
			return { link: name, title, thumbnail };
		});
		dispatch(setDisplayList(listToDisplay));

		return () => {
			dispatch(resetDisplayList());
		};
	}, [categories]);

	useEffect(() => {
		if (categories.length === 0) {
			api.categories.getCategories()
				.then((categories) => {
					dispatch(setCategories(categories));
					setShowPreloader(false);
				})
				.catch((error) => {
					console.error(error);

					setShowPreloader(false);
				});
		}
		else {
			setShowPreloader(false);
		}
	}, []);

	return (
		<>
			<PageTop title="Коллекция" />
			<Seo title="Камамото: коллекция японской керамики" />
			{ /* <h2 className="title title2">Коллекция</h2> */ }
			<section className="section collection">
				{ categories.length === 0 && showPreloader
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
