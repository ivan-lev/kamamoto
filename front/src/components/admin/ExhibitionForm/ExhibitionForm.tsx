import type { RootState } from '@/slices/admin';
import type { ChangeEvent, FormEvent } from 'react';
import {
	clearExhibitionForm,
	setExhibitionsList,
	setExhibitionToDisplay,
} from '@/slices/admin/exhibitions';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ExhibitionForm() {
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
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

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: value }));
	};

	function handleChangePhotos(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: value.replace(/\s/g, ',').split(',') }));
	};

	const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		dispatch(setExhibitionToDisplay({ ...exhibitionToDisplay, [name]: checked }));
	};

	const handleCreateExhibition = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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

	const handleUpdateExhibition = () => {
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

	const handleDeleteExhibition = () => {
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibitions.deleteExhibition(token, exhibitionToDisplay)
				.then((response) => {
					const updatedExhibitionsList = exhibitionsList.filter(exhibition => exhibition.id !== response.id);
					dispatch(setExhibitionsList(updatedExhibitionsList));
					setIsFormDisabled(false);
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
		<form className="form" onSubmit={handleCreateExhibition}>
			<fieldset className="form__fieldset" disabled={isFormDisabled}>
				<legend className="form__legend">Добавить выставку</legend>

				<div className="form__grid">
					<div className="form__row form__row-2">
						<span>номер</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="id"
							placeholder="id"
							value={id}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-2">
						<span>год</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="year"
							placeholder="год"
							value={year}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-6">
						<span>даты</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="dates"
							placeholder="даты"
							value={dates}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-6">
						<span>название</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="name"
							placeholder="название выставки"
							value={name}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-6">
						<span>город</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="city"
							placeholder="город"
							value={city}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-6">
						<span>адрес</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="address"
							placeholder="адрес"
							value={address}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-6">
						<span>место проведения</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="place"
							placeholder="место проведения"
							value={place}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-6">
						<span>кураторы</span>
						<textarea
							className="textarea"
							name="curators"
							placeholder="кураторы"
							value={curators}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-6">
						<span>организаторы</span>
						<textarea
							className="textarea"
							name="organisators"
							placeholder="организаторы"
							value={organisators}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>описание</span>
						<textarea
							className="textarea"
							name="description"
							placeholder="описание"
							value={description}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>фотографии</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="photos"
							placeholder="фотографии"
							value={photos}
							onChange={handleChangePhotos}
						/>
					</div>

					<div className="form__row form__row-8">
						<span>ссылка</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="link"
							placeholder="ссылка"
							value={link || ''}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-3">
						<span>афиша</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="poster"
							placeholder="афиша"
							value={poster}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-1">
						<span>актив</span>
						<label
							className={`checkbox-label ${
								isActive ? 'checkbox-label--checked' : ''
							} ${
								isFormDisabled ? 'checkbox-label--disabled' : ''
							}`}
						>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={isActive}
								name="isActive"
								onChange={handleCheckBox}
							/>
						</label>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						{!isExistingExhibitionEdited
							? (
									<>
										<button
											className="button"
											type="button"
											onClick={() => dispatch(clearExhibitionForm())}
										>
											Очистить
										</button>
										<button className="button" type="submit">
											Создать
										</button>
									</>
								)
							: (
									<>
										<button
											className="button"
											type="button"
											onClick={handleUpdateExhibition}
											disabled={isFormDisabled}
										>
											Сохранить
										</button>
										<button className="button" type="button" onClick={handleDeleteExhibition}>
											Удалить
										</button>
									</>
								)}
					</div>
				</div>
			</fieldset>
			<span className="form__submit-status">{saveMessage}</span>
		</form>

	);
}
