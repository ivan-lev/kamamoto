// Types
import type { RootState } from '../../slices';

// React and redux
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from '../../slices/categories';
import { resetDisplayList, setDisplayList } from '../../slices/listSlice';

// Components
import DisplayGrid from '../DisplayGrid/DisplayGrid';
import Preloader from '../Preloader/Preloader';
import Seo from '../Seo/Seo';

// Utils and variables
import { api } from '../../utils/api';

import './Collection.scss';

export default function Collection() {
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const categories = useSelector((state: RootState) => state.categories);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		const listToDisplay = categories.map((cat) => {
			const { category, title, thumbnailPath } = cat;
			return { link: category, title, thumb: thumbnailPath };
		});
		dispatch(setDisplayList(listToDisplay));

		return () => {
			dispatch(resetDisplayList());
		};
	}, [categories]);

	useEffect(() => {
		if (categories.length === 0) {
			api
				.getCategories()
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
			<Seo title="Камамото: коллекция японской керамики" />

			<section className="section collection">
				<h2 className="title title2">Коллекция</h2>
				{categories.length === 0 && showPreloader
					? (
							<Preloader />
						)
					: (
							<DisplayGrid />
						)}
			</section>
		</>
	);
}
