import type { RootState } from '@/slices/admin';
import type { Exhibit } from '@/types/exhibitType';
import AdminExhibitForm from '@/components/admin/ExhibitForm/ExhibitForm';
import Modal from '@/components/Modal/Modal';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { clearExhibitForm, setExhibits, setExhibitToEdit } from '@/slices/admin/exibits';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Exhibits() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);

	const dispatch = useDispatch();
	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);

	function handleSetExhibitToEdit(data: Exhibit) {
		dispatch(setExhibitToEdit(data));
		setShowModal(true);
	}

	function handleOpenEmptyForm() {
		dispatch(clearExhibitForm());
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

							<button className="button" onClick={handleOpenEmptyForm}>Создать лот</button>

							<Modal
								showModal={showModal}
								closeModal={() => setShowModal(false)}
							>
								<AdminExhibitForm />
							</Modal>
						</div>
					)}
		</>
	);
}
