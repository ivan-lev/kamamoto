import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/shared/Button';
import { clearExhibitionForm, setExhibitionsList, setExhibitionToDisplay } from '@/slices/admin/exhibitions';
import { api } from '@/utils/api/api';

interface Props {
	closeModal: () => void;
}

export default function ExhibitionForm({ closeModal }: Props) {
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const dispatch = useDispatch();

	const exhibitionsList = useSelector((state: RootState) => state.exhibitions.exhibitionsList);
	const isExistingExhibitionEdited = useSelector(
		(state: RootState) => state.exhibitions.isExistingExhibitionEdited,
	);
	const exhibitionToDisplay = useSelector(
		(state: RootState) => state.exhibitions.exhibitionToEdit,
	);

	const {
		id,
		year,
		dates,
		city,
		address,
		place,
		name,
		link,
		description,
		photos,
		poster,
		curators,
		organisators,
		isActive,
	} = exhibitionToDisplay;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: value }));
	};

	function handleChangePhotos(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: value.replace(/\s/g, ',').split(',') }));
	};

	function handleCheckBox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: checked }));
	};

	function handleCreateExhibition() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibitions.createExhibition(token, {
				...exhibitionToDisplay,
				id: Number(id),
				year: Number(year),
			})
				.then((response) => {
					dispatch(setExhibitionsList([...exhibitionsList, response]));
					dispatch(clearExhibitionForm());
					setIsFormDisabled(false);
					setSaveMessage('Выставка создана');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	function handleUpdateExhibition() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibitions.updateExhibition(token, exhibitionToDisplay)
				.then((response) => {
					const updatedExhibitionsList = exhibitionsList.map((exhibition) => {
						return exhibition.id !== exhibitionToDisplay.id ? exhibition : response;
					});
					dispatch(setExhibitionsList(updatedExhibitionsList));
					setIsFormDisabled(false);
					setSaveMessage('Данные обновлены');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	function handleDeleteExhibition() {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibitions.deleteExhibition(token, exhibitionToDisplay)
				.then((response: number) => {
					const updatedExhibitionsList = exhibitionsList.filter(exhibition => exhibition.id !== response);
					dispatch(setExhibitionsList(updatedExhibitionsList));
					dispatch(clearExhibitionForm());
					setIsFormDisabled(false);
					setShowConfirmation(false);
					closeModal();
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
				});
		}
	};

	useEffect(() => {
		if (saveMessage) {
			setTimeout(() => setSaveMessage(''), 3000);
		}
	}, [saveMessage]);

	return (
		<form className="form" inert={ isFormDisabled }>
			<fieldset className="form__fieldset">
				<legend>Добавить выставку</legend>

				<div className="form__grid">
					<div className="form__row form__row-2">
						<span>номер</span>
						<input
							className="input"
							type="text"
							name="id"
							placeholder="id"
							value={ id }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-2">
						<span>год</span>
						<input
							className="input"
							type="text"
							name="year"
							placeholder="год"
							value={ year }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-6">
						<span>даты</span>
						<input
							className="input"
							type="text"
							name="dates"
							placeholder="даты"
							value={ dates }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-6">
						<span>название</span>
						<input
							className="input"
							type="text"
							name="name"
							placeholder="название выставки"
							value={ name }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-6">
						<span>город</span>
						<input
							className="input"
							type="text"
							name="city"
							placeholder="город"
							value={ city }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-6">
						<span>адрес</span>
						<input
							className="input"
							type="text"
							name="address"
							placeholder="адрес"
							value={ address }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-6">
						<span>место проведения</span>
						<input
							className="input"
							type="text"
							name="place"
							placeholder="место проведения"
							value={ place }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-6">
						<span>кураторы</span>
						<textarea
							className="textarea"
							name="curators"
							placeholder="кураторы"
							value={ curators }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-6">
						<span>организаторы</span>
						<textarea
							className="textarea"
							name="organisators"
							placeholder="организаторы"
							value={ organisators }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>описание</span>
						<textarea
							className="textarea"
							name="description"
							placeholder="описание"
							value={ description }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>фотографии</span>
						<input
							className="input"
							type="text"
							name="photos"
							placeholder="фотографии"
							value={ photos }
							onChange={ handleChangePhotos }
						/>
					</div>

					<div className="form__row form__row-8">
						<span>ссылка</span>
						<input
							className="input"
							type="text"
							name="link"
							placeholder="ссылка"
							value={ link || '' }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-3">
						<span>афиша</span>
						<input
							className="input"
							type="text"
							name="poster"
							placeholder="афиша"
							value={ poster }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>актив</span>
						<label className={ `checkbox-label ${isActive ? 'checkbox-label--checked' : ''} ` }>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={ isActive }
								name="isActive"
								onChange={ handleCheckBox }
							/>
						</label>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						<span className="form__request-status">{ saveMessage }</span>
						{ !isExistingExhibitionEdited
							? (
								<>
									<Button title="Очистить" action={ () => dispatch(clearExhibitionForm()) } />
									<Button title="Создать" action={ handleCreateExhibition } />
								</>
							)
							: (
								<>
									{ showConfirmation && (
										<div className="form__confirmation">
											<span>Точно удалить запись?</span>
											<Button title="Да" action={ handleDeleteExhibition } />
											<Button title="Нет" action={ () => setShowConfirmation(false) } />
										</div>
									) }
									{ !showConfirmation && (
										<>
											<Button title="Сохранить" action={ handleUpdateExhibition } />
											<Button title="Удалить запись" action={ () => setShowConfirmation(true) } />
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
