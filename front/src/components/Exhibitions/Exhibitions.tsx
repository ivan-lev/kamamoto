import type { RootState } from '@/slices/visitor';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExhibitionCard from '@/components/ExhibitionCard/ExhibitionCard';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
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
			<Seo title="Камамото: мероприятия, на которых представлена коллекция" />

			<h2 className="title title2">Выставки</h2>

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
