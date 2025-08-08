import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExhibitForm from '@/components/admin/ExhibitForm/ExhibitForm';
import ExhibitsListRow from '@/components/admin/ExhibitsListRow/ExhibitsListRow';
import Modal from '@/components/Modal/Modal';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';
import { clearExhibitForm, setExhibits, setIsExistingExhibitEdited } from '@/slices/admin/exibits';
import { api } from '@/utils/api/api';

export default function Exhibits() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);

	const dispatch = useDispatch();
	const exhibitsFiltered = useSelector((state: RootState) => state.exhibits.exhibitsFiltered);

	function handleOpenEmptyForm() {
		dispatch(setIsExistingExhibitEdited(false));
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
									<span className="table__cell table__cell--span-5">Название</span>
									<span className="table__cell table__cell--span-2">Категория</span>
									<span className="table__cell table__cell--span-2">Стиль</span>
									<span className="table__cell table__cell--centered">Ред</span>
									<span className="table__cell">Актив</span>
								</div>
								{exhibitsFiltered.map(exhibit => (
									<ExhibitsListRow key={exhibit.id} exhibit={exhibit} setShowModal={setShowModal} />
								))}
							</div>

							<button className="button" onClick={handleOpenEmptyForm}>Создать лот</button>

							<Modal
								showModal={showModal}
								closeModal={() => setShowModal(false)}
							>
								<ExhibitForm />
							</Modal>
						</div>
					)}
		</>
	);
}
