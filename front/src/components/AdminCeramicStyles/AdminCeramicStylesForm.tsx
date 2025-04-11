import type { RootState } from '@/slices/admin';
import type { ChangeEvent, FormEvent } from 'react';
import {
	clearCeramicStyleForm,
	setCeramicStyles,
	setCeramicStyleToEdit,
} from '@/slices/admin/ceramicStyles';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminCeramicStylesForm() {
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const dispatch = useDispatch();

	const ceramicStylesList = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);
	const isExistingStyleEdited = useSelector(
		(state: RootState) => state.ceramicStyles.isExistingStyleEdited,
	);
	const ceramicStyleToEdit = useSelector(
		(state: RootState) => state.ceramicStyles.ceramicStyleToEdit,
	);

	const {
		additionalImages,
		brief,
		description,
		images,
		showArticle,
		name,
		title,
		thumbnail,
	} = ceramicStyleToEdit;

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: value }));
	};

	function handleChangePhotos(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: value.replace(/\s/g, '').split(',') }));
	};

	const handleCheckBox = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: checked }));
	};

	const handleCreateCeramicStyle = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.ceramicStyles.createCeramicStyle(token, ceramicStyleToEdit)
				.then((response) => {
					const updatedCeramicStylesList = [...ceramicStylesList, response];
					dispatch(setCeramicStyles(updatedCeramicStylesList));
					dispatch(clearCeramicStyleForm());
					setIsFormDisabled(false);
					setSaveMessage('Стиль керамики создан');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	// const handleUpdateExhibition = () => {
	// 	setIsFormDisabled(true);
	// 	const token = localStorage.getItem('kmmttkn');
	// 	if (token) {
	// 		api.exhibitions.updateExhibition(token, exhibitionToDisplay)
	// 			.then((response) => {
	// 				const updatedExhibitionsList = exhibitionsList.map((exhibition) => {
	// 					return exhibition.id !== exhibitionToDisplay.id ? exhibition : response;
	// 				});
	// 				dispatch(setExhibitionsList(updatedExhibitionsList));
	// 				setIsFormDisabled(false);
	// 				setSaveMessage('Данные обновлены');
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 				setIsFormDisabled(false);
	// 				setSaveMessage('Что-то пошло не так :(');
	// 			});
	// 	}
	// };

	// const handleCloseExhibitionForm = () => {
	// 	dispatch(setExhibitionFormShowed(false));
	// 	dispatch(clearExhibitionForm());
	// };

	// const handleDeleteExhibition = () => {
	// 	const token = localStorage.getItem('kmmttkn');
	// 	if (token) {
	// 		api.exhibitions.deleteExhibition(token, exhibitionToDisplay)
	// 			.then((response) => {
	// 				const updatedExhibitionsList = exhibitionsList.filter(exhibition => exhibition.id !== response.id);
	// 				dispatch(setExhibitionsList(updatedExhibitionsList));
	// 				handleCloseExhibitionForm();
	// 				setIsFormDisabled(false);
	// 			})
	// 			.catch((error) => {
	// 				console.error(error);
	// 				setIsFormDisabled(false);
	// 			});
	// 	}
	// };

	useEffect(() => {
		if (saveMessage) {
			setTimeout(() => setSaveMessage(''), 3000);
		}
	}, [saveMessage]);

	return (
		<form
			className="form"
			onSubmit={handleCreateCeramicStyle}
		>
			<fieldset className="form__fieldset" disabled={isFormDisabled}>
				<legend className="form__legend">Форма в процессе редактирования</legend>

				<div className="form__grid">
					<div className="form__row form__row-3">
						<span>имя</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="name"
							placeholder="на англ. языке"
							value={name}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-3">
						<span>заголовок</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="title"
							placeholder="на русс. языке"
							value={title}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-3">
						<span>тхумб</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="thumbnail"
							placeholder="тхумб"
							value={thumbnail}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-2">
						<span>акт-сть</span>
						<label
							className={`checkbox-label ${
								showArticle ? 'checkbox-label--checked' : ''
							} ${
								isFormDisabled ? 'checkbox-label--disabled' : ''
							}`}
						>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={showArticle}
								name="isDescription"
								onChange={handleCheckBox}
							/>
						</label>
					</div>

					<div className="form__row form__row-12">
						<span>изображения</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="images"
							placeholder="изображения"
							value={images}
							onChange={handleChangePhotos}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>дополнительные изображения</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="additionalImages"
							placeholder="дополнительные изображения"
							value={additionalImages}
							onChange={handleChangePhotos}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>краткое описание</span>
						<textarea
							className={`textarea ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							name="brief"
							placeholder="краткое описание"
							value={brief}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>полное описание</span>
						<textarea
							className="textarea"
							name="description"
							placeholder="полное описание"
							value={description}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						{!isExistingStyleEdited
							? (
									<>
										<button
											className="button"
											type="button"
											onClick={() => dispatch(clearCeramicStyleForm())}
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
											// onClick={handleUpdateExhibition}
											disabled={isFormDisabled}
										>
											Сохранить
										</button>
										<button
											className="button"
											type="button"
											// onClick={handleDeleteExhibition}
										>
											Удалить
										</button>
									</>
								)}

						<button
							className="button"
							type="button"
							// onClick={handleCloseExhibitionForm}
						>
							Закрыть
						</button>
					</div>
				</div>
			</fieldset>
			<span className="form__submit-status">{saveMessage}</span>
		</form>

	);
}
