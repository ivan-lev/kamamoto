import type { RootState } from '@/slices/admin';
import type { Exhibit } from '@/types/exhibitType';
import AdminExhibitForm from '@/components/AdminExhibitForm/AdminExhibitForm';
import Modal from '@/components/Modal/Modal';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { setExhibits, setExhibitToEdit, setIsExistingExhibitEdited } from '@/slices/admin/exibits';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AdminExhibits.scss';

export default function AdminExhibits() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const dispatch = useDispatch();
	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);
	const [showModal, setShowModal] = useState<boolean>(false);

	function handleSetExhibitToEdit(data: Exhibit) {
		dispatch(setExhibitToEdit(data));
		dispatch(setIsExistingExhibitEdited(true));
		setShowModal(true);
	}

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibits.getExhibits()
				.then((exhibits) => {
					dispatch(setExhibits(exhibits));
					setShowPreloader(false);
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<>
			<Seo title="Камамото: лоты" />

			{showPreloader
				? (
						<Preloader />
					)
				: (
						<div className="container container--background-transparent">
							<h2 className="title3">Лоты</h2>
							<div className="table">
								<div className="table__row">
									<span className="table__cell">ID</span>
									<span className="table__cell table__cell--span-6">Название</span>
									<span className="table__cell table__cell--span-2">Категория</span>
									<span className="table__cell table__cell--span-2">Стиль</span>
									<span className="table__cell table__cell--centered"></span>
								</div>
								{exhibits.map(exhibit => (
									<div className="table__row" key={exhibit.id}>
										<span className="table__cell">{exhibit.id}</span>
										<span className="table__cell table__cell--span-6">{exhibit.name}</span>
										<span className="table__cell table__cell--span-2">{exhibit.category.title}</span>
										<span className="table__cell table__cell--span-2">{exhibit.style?.title}</span>
										<div className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												onClick={() => handleSetExhibitToEdit(exhibit)}
											>
											</button>
										</div>
									</div>
								))}
							</div>

							<Modal
								showModal={showModal}
								closeModal={() => setShowModal(false)}
								content={<AdminExhibitForm />}
							/>
						</div>
					)}
		</>
	);
}
