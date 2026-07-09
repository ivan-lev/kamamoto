import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import type { Marker } from '@/types/marker';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/shared/Button';
import { MARKER_GROUPS } from '@/components/visitor/Map/markerGroups';
import { clearMarkerForm, setMarkers, setMarkerToEdit } from '@/slices/admin/markers';
import { api } from '@/utils/api/api';

export default function MarkersFormView() {
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const dispatch = useDispatch();

	const markersList = useSelector((state: RootState) => state.markers.markersList);
	const isExistingMarkerEdited = useSelector((state: RootState) => state.markers.isExistingMarkerEdited);
	const markerToEdit = useSelector((state: RootState) => state.markers.markerToEdit);

	const {
		title,
		kanji,
		romaji,
		info,
		image,
		geocode,
		groupName,
		isActive,
	} = markerToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
		const { name, value } = event.target;
		dispatch(setMarkerToEdit({ ...markerToEdit, [name]: value }));
	};

	function handleCheckBox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setMarkerToEdit({ ...markerToEdit, [name]: checked }));
	};

	function handleGeocodeChange(index: 0 | 1, event: ChangeEvent<HTMLInputElement>) {
		const newGeocode: [number, number] = [...geocode];
		newGeocode[index] = Number(event.target.value);
		dispatch(setMarkerToEdit({ ...markerToEdit, geocode: newGeocode }));
	};

	async function handleCreateMarker() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			try {
				const response = await api.maps.createMarker(token, markerToEdit);

				const updatedMarkersList = [...markersList, response];
				dispatch(setMarkers(updatedMarkersList));
				dispatch(clearMarkerForm());
				setIsFormDisabled(false);
				setSaveMessage('Маркер создан');
			}
			catch (error: any) {
				setIsFormDisabled(false);
				setSaveMessage(error.message || 'Что-то пошло не так :(');
			}
		}
	};

	function handleUpdateMarker() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.maps.updateMarker(token, markerToEdit)
				.then((response: Marker) => {
					const updatedMarkersList = markersList.map(marker => marker._id !== response._id ? marker : response);

					dispatch(setMarkers(updatedMarkersList));
					setIsFormDisabled(false);
					setSaveMessage('Данные обновлены');
				})
				.catch((error: any) => {
					setIsFormDisabled(false);
					setSaveMessage(error.message || 'Что-то пошло не так :(');
				});
		}
	};

	function handleDeleteMarker() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.maps.deleteMarker(token, markerToEdit._id)
				.then((response) => {
					const updatedMarkersList = markersList.filter(marker => marker._id !== response._id);
					dispatch(setMarkers(updatedMarkersList));
					dispatch(clearMarkerForm());
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage(error.message);
				});
		}
	};

	useEffect(() => {
		if (saveMessage) {
			setTimeout(setSaveMessage, 3000, '');
		}
	}, [saveMessage]);

	return (
		<form className="form" inert={ isFormDisabled }>
			<fieldset className="form__fieldset">
				<legend>{ !isExistingMarkerEdited ? 'Добавить маркер' : 'Редактировать маркер' }</legend>

				<div className="form__grid">
					<div className="form__row form__row-4">
						<span>название</span>
						<input
							className="input"
							type="text"
							name="title"
							placeholder="название"
							value={ title }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>кандзи</span>
						<input
							className="input"
							type="text"
							name="kanji"
							placeholder="кандзи"
							value={ kanji }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>ромадзи</span>
						<input
							className="input"
							type="text"
							name="romaji"
							placeholder="ромадзи"
							value={ romaji }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-3">
						<span>широта</span>
						<input
							className="input"
							type="number"
							step="any"
							placeholder="широта"
							value={ geocode[0] }
							onChange={ event => handleGeocodeChange(0, event) }
						/>
					</div>

					<div className="form__row form__row-3">
						<span>долгота</span>
						<input
							className="input"
							type="number"
							step="any"
							placeholder="долгота"
							value={ geocode[1] }
							onChange={ event => handleGeocodeChange(1, event) }
						/>
					</div>

					<div className="form__row form__row-3">
						<span>файл изображения</span>
						<input
							className="input"
							type="text"
							name="image"
							placeholder="файл изображения"
							value={ image }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-3">
						<span>группа</span>
						<select
							className="input"
							name="groupName"
							value={ groupName }
							onChange={ handleChange }
						>
							{ MARKER_GROUPS.map(group => (
								<option key={ group.groupName } value={ group.groupName }>{ group.title }</option>
							)) }
						</select>
					</div>

					<div className="form__row form__row-4">
						<span>показывать на карте</span>
						<label className={ `checkbox-label ${isActive ? 'checkbox-label--checked' : ''}` }>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={ isActive }
								name="isActive"
								onChange={ handleCheckBox }
							/>
						</label>
					</div>

					<div className="form__row form__row-12">
						<span>информация о маркере</span>
						<textarea
							className="textarea"
							name="info"
							placeholder="информация о маркере"
							value={ info }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						<span className="form__request-status">{ saveMessage }</span>
						{ !isExistingMarkerEdited && (
							<>
								<Button title="Очистить" action={ () => dispatch(clearMarkerForm()) } />
								<Button title="Создать" action={ handleCreateMarker } />
							</>
						) }

						{ isExistingMarkerEdited && (
							<>
								{ showConfirmation
									? (
										<>
											<span>Точно удалить запись?</span>
											<Button title="Да" action={ handleDeleteMarker } />
											<Button title="Нет" action={ () => setShowConfirmation(false) } />
										</>
									)
									: (
										<>
											<Button title="Обновить" action={ handleUpdateMarker } />
											<Button title="Удалить" action={ () => setShowConfirmation(true) } />
										</>
									) }
							</>
						) }
					</div>
				</div>
			</fieldset>
		</form>

	);
}
