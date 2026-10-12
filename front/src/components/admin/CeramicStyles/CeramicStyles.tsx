import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CeramicStyleFormView from '@/components/admin/CeramicStyles/CeramicStyleFormView';
import CeramicStylesRow from '@/components/admin/CeramicStyles/CeramicStylesRow';
import Filters from '@/components/admin/shared/Filters/Filters';
import Modal from '@/components/shared/Modal';
import Preloader from '@/components/shared/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { setCeramicStyles, setCeramicStyleToEdit, setIsExistingStyleEdited } from '@/slices/admin/ceramicStyles';
import { defaultCeramicStyle } from '@/types/ceramicStyles';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

export default function CeramicStyles() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');
	const dispatch = useDispatch();
	const ceramicStylesList = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);
	const isExistingStyleEdited = useSelector(
		(state: RootState) => state.ceramicStyles.isExistingStyleEdited,
	);

	const normalizedQuery = query.trim().toLowerCase();
	const ceramicStylesFiltered = normalizedQuery
		? ceramicStylesList.filter(style => style.title.toLowerCase().includes(normalizedQuery) || style.name.toLowerCase().includes(normalizedQuery))
		: ceramicStylesList;

	function createNewCeramicStyle() {
		dispatch(setIsExistingStyleEdited(false));
		dispatch(setCeramicStyleToEdit({ ...defaultCeramicStyle }));
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
		if (isExistingStyleEdited) {
			dispatch(setCeramicStyleToEdit({ ...defaultCeramicStyle }));
			dispatch(setIsExistingStyleEdited(false));
		}
	}

	useEffect(() => {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		async function fetchCeramicStyles() {
			try {
				dispatch(setCeramicStyles(await api.ceramicStyles.getCeramicStyles(true)));
				setShowPreloader(false);
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchCeramicStyles();
	}, [dispatch]);

	return (
		<>
			<Seo title="Камамото: стили керамики" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<div className="container container--background-transparent">
						<h1 className="title title--1">Стили керамики</h1>

						<Filters
							query={ query }
							searchPlaceholder="поиск: часть заголовка или имени стиля"
							onQueryChange={ setQuery }
						/>

						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-2">Имя</span>
								<span className="table__cell table__cell--span-3">Заголовок</span>
								<span className="table__cell table__cell--span-3">Мини карта</span>
								<span className="table__cell table__cell--span-2">Тхумб</span>
								<span className="table__cell table__cell--centered">Ред</span>
								<span className="table__cell table__cell--centered">Акт</span>
							</div>

							{ ceramicStylesFiltered.map(style => <CeramicStylesRow key={ style.name } style={ style } setShowModal={ setShowModal } />) }
						</div>

						<Modal showModal={ showModal } closeModal={ () => handleCloseModal() }>
							<CeramicStyleFormView />
						</Modal>

						<button className="button admin__create-button" onClick={ () => createNewCeramicStyle() }>
							Создать
						</button>
					</div>
				) }
		</>
	);
}
