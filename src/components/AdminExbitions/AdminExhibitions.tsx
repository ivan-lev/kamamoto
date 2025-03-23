import type { RootState } from '@/slices/admin';
import AdminExhibitionForm from '@/components/AdminExhibitionForm/AdminExhibitionForm';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import {
	openEmptyExhibitionForm,
	setExhibitionsList,
	setExhibitionToEdit,
} from '@/slices/admin/exhibitions';
import { api } from '@/utils/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminExhibitions.scss';

export default function AdminExhibitions(): JSX.Element {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);

	const dispatch = useDispatch();
	const exhibitionsList = useSelector((state: RootState) => state.exhibitions.exhibitionsList);
	const isExhibitionFormShowed = useSelector(
		(state: RootState) => state.exhibitions.isExhibitionFormShowed,
	);

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api
				.getExhibitions()
				.then((exhibitions) => {
					dispatch(setExhibitionsList(exhibitions));
					setShowPreloader(false);
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<>
			<Seo title="Камамото: выставки" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<div className="container container--background-transparent admin-exhibitions">
							<h2 className="title3">Выставки</h2>
							<div className="admin-section-list">
								<div className="admin-exhibitions__row">
									<span>ID</span>
									<span>Название</span>
									<span>Город</span>
									<span>Год</span>
									<span>Акт-сть</span>
									<span></span>
								</div>
								{exhibitionsList.map((exhibition) => {
									return (
										<div
											key={exhibition.id}
											className="admin-exhibitions__row"
										>
											<span>{exhibition.id}</span>
											<span>{exhibition.name}</span>
											<span>{exhibition.city}</span>
											<span>{exhibition.year}</span>
											<span>{exhibition.isActive ? 'Да' : 'Нет'}</span>
											<span>
												<button
													className="admin-section-list__edit-button"
													onClick={() => dispatch(setExhibitionToEdit(exhibition.id))}
												>
												</button>
											</span>
										</div>
									);
								})}
							</div>

							{isExhibitionFormShowed
								? (
										<AdminExhibitionForm />
									)
								: (
										<button className="button" onClick={() => dispatch(openEmptyExhibitionForm())}>
											Создать
										</button>
									)}
						</div>
					)}
		</>
	);
}
