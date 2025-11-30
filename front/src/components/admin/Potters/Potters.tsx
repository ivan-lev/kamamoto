import type { RootState } from '@/slices/admin';
import type { Potter } from '@/types/potter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PottersForm from '@/components/admin/Potters/PottersForm';
import Modal from '@/components/shared/Modal';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { setIsExistingPotterEdited, setPotters, setPotterToEdit } from '@/slices/admin/potters';
import { defaultPotter } from '@/types/potter';
import { api } from '@/utils/api/api';

export default function Potters() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const dispatch = useDispatch();
	const pottersList = useSelector((state: RootState) => state.potters.pottersList);
	const isExistingPotterEdited = useSelector((state: RootState) => state.potters.isExistingPotterEdited);

	function handleSetPotterToEdit(data: Potter) {
		dispatch(setIsExistingPotterEdited(true));
		dispatch(setPotterToEdit(data));
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
		if (isExistingPotterEdited) {
			dispatch(setPotterToEdit({ ...defaultPotter }));
			dispatch(setIsExistingPotterEdited(false));
		}
	}

	function handleOpenModal() {
		dispatch(setPotterToEdit({ ...defaultPotter }));
		dispatch(setIsExistingPotterEdited(false));
		setShowModal(true);
	}

	useEffect(() => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.potters.getPotters()
				.then((potters) => {
					dispatch(setPotters(potters));
					setShowPreloader(false);
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<>
			<Seo title="Камамото: гончары" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<div className="container container--background-transparent">
						<h1 className="title title--1">Гончары</h1>
						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-3">id</span>
								<span className="table__cell table__cell--span-4">Имя</span>
								<span className="table__cell table__cell--span-4">Имя на японском</span>
								<span className="table__cell table__cell--centered"></span>
							</div>
							{ pottersList.map((potter) => {
								return (
									<div
										key={ potter.id }
										className="table__row"
									>
										<span className="table__cell table__cell--span-3">{ potter.id }</span>
										<span className="table__cell table__cell--span-4">{ potter.name }</span>
										<span className="table__cell table__cell--span-4">{ potter.japaneseName }</span>
										<div className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												onClick={ () => handleSetPotterToEdit(potter) }
											>
											</button>
										</div>
									</div>
								);
							}) }
						</div>
						<Modal
							showModal={ showModal }
							closeModal={ () => handleCloseModal() }
						>
							<PottersForm />
						</Modal>
						<button className="button" onClick={ () => handleOpenModal() }>
							Создать
						</button>
					</div>
				) }
		</>
	);
}
