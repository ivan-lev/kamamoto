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
						<div className="container container--background-transparent">
							<h2 className="title3">Выставки</h2>
							<div className="table">
								<div className="table__row">
									<span className="table__cell">ID</span>
									<span className="table__cell table__cell--span-6">Название</span>
									<span className="table__cell table__cell--span-2">Город</span>
									<span className="table__cell">Год</span>
									<span className="table__cell table__cell--centered">Акт-сть</span>
									<span className="table__cell table__cell--centered"></span>
								</div>
								{exhibitionsList.map((exhibition) => {
									return (
										<div
											key={exhibition.id}
											className="table__row"
										>
											<span className="table__cell">{exhibition.id}</span>
											<span className="table__cell table__cell--span-6">{exhibition.name}</span>
											<span className="table__cell table__cell--span-2">{exhibition.city}</span>
											<span className="table__cell">{exhibition.year}</span>
											<span className="table__cell table__cell--centered">{exhibition.isActive ? 'Да' : 'Нет'}</span>
											<div className="table__cell table__cell--centered">
												<button
													className="table__button table__button--edit"
													onClick={() => dispatch(setExhibitionToEdit(exhibition.id))}
												>
												</button>
											</div>
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
