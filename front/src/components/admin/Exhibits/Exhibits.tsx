import type { RootState } from '@/slices/admin';
import type { Exhibit } from '@/types/exhibitType';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminExhibitForm from '@/components/admin/ExhibitForm/ExhibitForm';
import Modal from '@/components/Modal/Modal';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { clearExhibitForm, setExhibits, setExhibitToEdit, setIsExistingExhibitEdited } from '@/slices/admin/exibits';
import { api } from '@/utils/api/api';

export default function Exhibits() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);

	const dispatch = useDispatch();
	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);

	function handleSetExhibitToEdit(data: Exhibit) {
		dispatch(setIsExistingExhibitEdited(true));
		dispatch(setExhibitToEdit(data));
		setShowModal(true);
	}

	function handleOpenEmptyForm() {
		dispatch(setIsExistingExhibitEdited(false));
		dispatch(clearExhibitForm());
		setShowModal(true);
	}

	function toggleExhibitActiveState(exhibit: Exhibit) {
		const token = localStorage.getItem('kmmttkn');
		api.exhibits.toggleExhibitActiveState(token || '', { ...exhibit, isActive: !exhibit.isActive });
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
									<span className="table__cell table__cell--span-5">Название</span>
									<span className="table__cell table__cell--span-2">Категория</span>
									<span className="table__cell table__cell--span-2">Стиль</span>
									<span className="table__cell table__cell--centered">Ред</span>
									<span className="table__cell">Актив</span>
								</div>
								{exhibits.map(exhibit => (
									<div className="table__row" key={exhibit.id}>
										<span className="table__cell">{exhibit.id}</span>
										<span className="table__cell table__cell--span-5">{exhibit.name}</span>
										<span className="table__cell table__cell--span-2">{exhibit.category.title}</span>
										<span className="table__cell table__cell--span-2">{exhibit.style?.title}</span>
										<div className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												onClick={() => handleSetExhibitToEdit(exhibit)}
											>
											</button>
										</div>
										<div className="form__row form__row-1">
											<label className={`checkbox-label checkbox-label--small ${exhibit.isActive ? 'checkbox-label--checked' : ''} `}>
												<input
													className="checkbox-input"
													type="checkbox"
													checked={exhibit.isActive}
													name="isActive"
													onChange={() => toggleExhibitActiveState(exhibit)}
												/>
											</label>
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
