import type { RootState } from '@/slices/visitor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExhibitionCard from '@/components/visitor/ExhibitionCard/ExhibitionCard';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { setExhibitionsList } from '@/slices/visitor/exhibitions';
import { api } from '@/utils/api/api';
import './Exhibitions.scss';

export default function Exhibitions() {
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const exhibitions = useSelector((state: RootState) => state.exhibitions.exhibitionsList);

	useEffect(() => {
		if (exhibitions.length === 0) {
			api.exhibitions.getExhibitions()
				.then((response) => {
					dispatch(setExhibitionsList(response));
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
			<Seo
				title="Камамото: мероприятия, на которых представлена коллекция"
				description="Страница со списком выставок, симпозиумов, фестивалей и мероприятий, на которых были представлены предметы из коллекции"
			/>

			<PageTop title="Выставки" />

			<section className="section">
				{ showPreloader
					? (
						<Preloader />
					)
					: (
						<div className="exhibitions">
							<ul className="exhibitions__list">
								{ exhibitions
									.map((exhibition) => {
										return (
											<li className="exhibitions__element" key={ exhibition.id }>
												<div className="exhibitions__element-upper-line"></div>
												<div className="exhibitions__element-year">{ exhibition.year }</div>
												<div className="exhibitions__element-lower-line"></div>
												<ExhibitionCard exhibition={ exhibition } />
											</li>
										);
									})
									.reverse() }
							</ul>
						</div>
					) }
			</section>
		</>
	);
}
