import type { RootState } from '@/slices/admin';
import type { Marker } from '@/types/marker';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MarkersFormView from '@/components/admin/Markers/MarkersFormView';
import Filters from '@/components/admin/shared/Filters/Filters';
import Modal from '@/components/shared/Modal';
import Preloader from '@/components/shared/Preloader/Preloader';
import { MARKER_GROUPS } from '@/components/visitor/Map/markerGroups';
import Seo from '@/components/visitor/Seo/Seo';
import { setIsExistingMarkerEdited, setMarkers, setMarkerToEdit } from '@/slices/admin/markers';
import { defaultMarker } from '@/types/marker';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

export default function Markers() {
	const [showPreloader, setShowPreloader] = useState<boolean>(true);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [query, setQuery] = useState<string>('');
	const dispatch = useDispatch();
	const markersList = useSelector((state: RootState) => state.markers.markersList);
	const isExistingMarkerEdited = useSelector((state: RootState) => state.markers.isExistingMarkerEdited);

	const normalizedQuery = query.trim().toLowerCase();
	const markersFiltered = normalizedQuery
		// кандзи и ромадзи в схеме необязательные и без дефолтов — у части маркеров их может не быть
		? markersList.filter(marker => [marker.title, marker.kanji, marker.romaji, getGroupTitle(marker.groupName)]
			.some(field => (field ?? '').toLowerCase().includes(normalizedQuery)))
		: markersList;

	function getGroupTitle(groupName: string) {
		return MARKER_GROUPS.find(group => group.groupName === groupName)?.title ?? groupName;
	}

	function handleSetMarkerToEdit(data: Marker) {
		dispatch(setIsExistingMarkerEdited(true));
		dispatch(setMarkerToEdit(data));
		setShowModal(true);
	}

	function handleCloseModal() {
		setShowModal(false);
		if (isExistingMarkerEdited) {
			dispatch(setMarkerToEdit({ ...defaultMarker }));
			dispatch(setIsExistingMarkerEdited(false));
		}
	}

	function handleOpenModal() {
		dispatch(setMarkerToEdit({ ...defaultMarker }));
		dispatch(setIsExistingMarkerEdited(false));
		setShowModal(true);
	}

	useEffect(() => {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		async function fetchMarkers(token: string) {
			try {
				dispatch(setMarkers(await api.maps.getMarkers(token)));
				setShowPreloader(false);
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchMarkers(token);
	}, [dispatch]);

	return (
		<>
			<Seo title="Камамото: карта" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					<div className="container container--background-transparent">
						<h1 className="title title--1">Маркеры карты</h1>

						<Filters
							query={ query }
							searchPlaceholder="поиск: название, кандзи, ромадзи, группа"
							onQueryChange={ setQuery }
						/>

						<div className="table">
							<div className="table__row">
								<span className="table__cell table__cell--span-2">Название</span>
								<span className="table__cell table__cell--span-2">Кандзи</span>
								<span className="table__cell table__cell--span-2">Ромадзи</span>
								<span className="table__cell table__cell--span-4">Группа</span>
								<span className="table__cell">Активен</span>
								<span className="table__cell table__cell--centered">Редакт-ть</span>
							</div>
							{ markersFiltered.map((marker) => {
								const groupTitle = getGroupTitle(marker.groupName);
								return (
									<div
										key={ marker._id }
										className="table__row"
									>
										<span className="table__cell table__cell--span-2">{ marker.title }</span>
										<span className="table__cell table__cell--span-2">{ marker.kanji }</span>
										<span className="table__cell table__cell--span-2">{ marker.romaji }</span>
										<span className="table__cell table__cell--span-4">{ groupTitle }</span>
										<span className="table__cell">
											<div className={ `checkbox-label checkbox-label--small ${marker.isActive ? 'checkbox-label--checked' : ''}` }></div>
										</span>
										<div className="table__cell table__cell--centered">
											<button
												className="table__button table__button--edit"
												onClick={ () => handleSetMarkerToEdit(marker) }
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
							<MarkersFormView />
						</Modal>
						<button className="button admin__create-button" onClick={ () => handleOpenModal() }>
							Создать
						</button>
					</div>
				) }
		</>
	);
}
