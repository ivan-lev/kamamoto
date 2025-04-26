import type { RootState } from '@/slices/admin';
import ExhibitionForm from '@/components/admin/ExhibitionForm/ExhibitionForm';
import Modal from '@/components/Modal/Modal';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { openEmptyExhibitionForm, setExhibitionsList, setExhibitionToEdit } from '@/slices/admin/exhibitions';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Exhibitions() {
	const dispatch = useDispatch();
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const exhibitionsList = useSelector((state: RootState) => state.exhibitions.exhibitionsList);

	function handleEditExhibition(id: number) {
		dispatch(setExhibitionToEdit(id));
		setShowModal(true);
	}

	function handleCreateExhibition() {
		dispatch(openEmptyExhibitionForm());
		setShowModal(true);
	}

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibitions.getExhibitions(true)
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
								{exhibitionsList.map(exhibition => (
									<div key={exhibition.id} className="table__row">
										<span className="table__cell">{exhibition.id}</span>
										<span className="table__cell table__cell--span-6">{exhibition.name}</span>
										<span className="table__cell table__cell--span-2">{exhibition.city}</span>
										<span className="table__cell">{exhibition.year}</span>
										<span className="table__cell table__cell--centered">{exhibition.isActive ? 'Да' : 'Нет'}</span>
										<div className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												onClick={() => handleEditExhibition(exhibition.id)}
											>
											</button>
										</div>
									</div>
								))}
							</div>

							<Modal
								showModal={showModal}
								closeModal={() => setShowModal(false)}
							>
								<ExhibitionForm	closeModal={() => setShowModal(false)} />
							</Modal>

							<button className="button" onClick={handleCreateExhibition}>
								Создать
							</button>
						</div>
					)}
		</>
	);
}
