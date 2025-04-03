// Types and enums
import type { RootState } from '@/slices/visitor';
import DisplayGrid from '@/components/DisplayGrid/DisplayGrid';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { resetCategory, setCategory } from '@/slices/visitor/category';
import { resetDisplayList, setDisplayList } from '@/slices/visitor/list';
import { ExhibitCategory } from '@/types/exhibitCategory';
import { api } from '@/utils/api/api';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import './Category.scss';

export default function Category(): JSX.Element {
	const category = useParams().category;
	const dispatch = useDispatch();
	const categoryName = ExhibitCategory[category as keyof typeof ExhibitCategory];
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const listToDisplay = useSelector((state: RootState) => state.list.displayList);

	useLayoutEffect(() => {
		window.scrollTo(0, 0);
	});

	useEffect(() => {
		if (category) {
			dispatch(setCategory(category));
			api.getExhibitsByCategory(category)
				.then((response) => {
					dispatch(setDisplayList(response));
					setShowPreloader(false);
				})
				.catch((error) => {
					console.error(error);
					setShowPreloader(false);
				});
		}

		return () => {
			dispatch(resetCategory());
			dispatch(resetDisplayList());
		};
	}, [category]);

	return (
		<>
			<Seo title={`Камамото: ${categoryName.toLowerCase()}`} />

			<section className="section category">
				<div className="exhibit__breadcrumbs">
					<Link to=".." className="link link_navigational" relative="path">
						<img
							className="link__icon"
							src="/icons/link-arrow-left.svg"
						/>
						Назад
					</Link>
				</div>

				<h2 className="title title2 category__title">{categoryName}</h2>
				{listToDisplay.length === 0 && showPreloader
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
