import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PotterRow from '@/components/admin/Potters/PotterRow';
import PottersFormView from '@/components/admin/Potters/PottersFormView';
import Filters from '@/components/admin/shared/Filters/Filters';
import Modal from '@/components/shared/Modal';
import Preloader from '@/components/shared/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { setIsExistingPotterEdited, setPotters, setPotterToEdit } from '@/slices/admin/potters';
import { defaultPotter } from '@/types/potter';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

export default function Potters() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');
	const dispatch = useDispatch();
	const pottersList = useSelector((state: RootState) => state.potters.pottersList);
	const isExistingPotterEdited = useSelector((state: RootState) => state.potters.isExistingPotterEdited);

	const normalizedQuery = query.trim().toLowerCase();
	const pottersFiltered = normalizedQuery
		// japaneseName в схеме необязательный, а бэк отдаёт гончаров через lean() — поля может не быть
		? pottersList.filter(potter => [potter.name, potter.id, potter.japaneseName].some(field => (field ?? '').toLowerCase().includes(normalizedQuery)))
		: pottersList;

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
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		async function fetchPotters() {
			try {
				dispatch(setPotters(await api.potters.getPotters()));
				setShowPreloader(false);
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchPotters();
	}, [dispatch]);

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

						<Filters
							query={ query }
							searchPlaceholder="поиск: имя, id, имя на японском"
							onQueryChange={ setQuery }
						/>

						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-4">Имя</span>
								<span className="table__cell table__cell--span-3">id</span>
								<span className="table__cell table__cell--span-3">Имя на японском</span>
								<span className="table__cell table__cell--centered">В статьях</span>
								<span className="table__cell table__cell--centered"></span>
							</div>
							{ pottersFiltered.map(potter => <PotterRow key={ potter.id } potter={ potter } setShowModal={ setShowModal } />) }
						</div>
						<Modal
							showModal={ showModal }
							closeModal={ () => handleCloseModal() }
						>
							<PottersFormView />
						</Modal>
						<button className="button admin__create-button" onClick={ () => handleOpenModal() }>
							Создать
						</button>
					</div>
				) }
		</>
	);
}
