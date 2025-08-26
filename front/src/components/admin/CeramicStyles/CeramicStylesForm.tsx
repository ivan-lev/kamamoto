import type { ChangeEvent, FormEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCeramicStyleForm, setCeramicStyles, setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';
import { api } from '@/utils/api/api';
import errorHandler from '@/utils/errorHandler';

export default function CeramicStylesForm() {
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const [initialStyleName, setInitialStyleName] = useState<string>('');
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

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: value }));
	};

	function handleChangePhotos(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: value.replace(/\s/g, '').split(',') }));
	};

	function handleCheckBox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: checked }));
	};

	async function handleCreateCeramicStyle(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			try {
				const response = await api.ceramicStyles.createCeramicStyle(token, ceramicStyleToEdit);

				const updatedCeramicStylesList = [...ceramicStylesList, response];
				dispatch(setCeramicStyles(updatedCeramicStylesList));
				dispatch(clearCeramicStyleForm());
				setIsFormDisabled(false);
				setSaveMessage('Стиль керамики создан');
			}
			catch (error: any) {
				setIsFormDisabled(false);
				const errorJson = await error.json();
				setSaveMessage(errorHandler(errorJson));
			}
		}
	};

	function handleUpdateCeramicStyle() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.ceramicStyles.updateCeramicStyle(token, ceramicStyleToEdit, initialStyleName)
				.then((response) => {
					const updatedStylesList = ceramicStylesList.filter(style => style.name !== initialStyleName);
					updatedStylesList.push(response);

					dispatch(setCeramicStyles(updatedStylesList));
					setIsFormDisabled(false);
					setSaveMessage('Данные обновлены');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					return error.json();
				})
				.then((error) => {
					setSaveMessage(errorHandler(error));
				});
		}
	};

	function handleDeleteCeramicStyle() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.ceramicStyles.deleteCeramicStyle(token, ceramicStyleToEdit.name)
				.then((response) => {
					const updatedStylesList = ceramicStylesList.filter(style => style.name !== response.name);
					dispatch(setCeramicStyles(updatedStylesList));
					dispatch(clearCeramicStyleForm());
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					return error.json();
				})
				.then((error) => {
					setSaveMessage(errorHandler(error));
				});
		}
	};

	useEffect(() => {
		if (saveMessage) {
			setTimeout(() => setSaveMessage(''), 3000);
		}
	}, [saveMessage]);

	useEffect(() => {
		// set initial style name to pass it to backend
		// if it was changed on edit
		if (!initialStyleName)
			setInitialStyleName(ceramicStyleToEdit.name);
		return () => setInitialStyleName('');
	}, []);

	return (
		<form
			className="form"
			onSubmit={ handleCreateCeramicStyle }
		>
			<fieldset className="form__fieldset" disabled={ isFormDisabled }>
				<legend className="form__legend">
					{ isExistingStyleEdited
						? 'Редактировать существующий стиль керамики'
						: 'Создать новый стиль керамики' }
				</legend>

				<div className="form__grid">
					<div className="form__row form__row-3">
						<span>имя</span>
						<input
							className={ `input ${
								isFormDisabled ? 'input_disabled' : ''
							}` }
							type="text"
							name="name"
							placeholder="на англ. языке"
							value={ name }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-3">
						<span>заголовок</span>
						<input
							className={ `input ${
								isFormDisabled ? 'input_disabled' : ''
							}` }
							type="text"
							name="title"
							placeholder="на русс. языке"
							value={ title }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-3">
						<span>тхумб</span>
						<input
							className={ `input ${
								isFormDisabled ? 'input_disabled' : ''
							}` }
							type="text"
							name="thumbnail"
							placeholder="тхумб"
							value={ thumbnail }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-2">
						<span>Показать статью</span>
						<label
							className={ `checkbox-label ${
								showArticle ? 'checkbox-label--checked' : ''
							} ${
								isFormDisabled ? 'checkbox-label--disabled' : ''
							}` }
						>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={ showArticle }
								name="showArticle"
								onChange={ handleCheckBox }
							/>
						</label>
					</div>

					<div className="form__row form__row-12">
						<span>изображения</span>
						<input
							className={ `input ${
								isFormDisabled ? 'input_disabled' : ''
							}` }
							type="text"
							name="images"
							placeholder="изображения"
							value={ images }
							onChange={ handleChangePhotos }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>дополнительные изображения</span>
						<input
							className={ `input ${
								isFormDisabled ? 'input_disabled' : ''
							}` }
							type="text"
							name="additionalImages"
							placeholder="дополнительные изображения"
							value={ additionalImages }
							onChange={ handleChangePhotos }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>краткое описание</span>
						<textarea
							className={ `textarea ${
								isFormDisabled ? 'input_disabled' : ''
							}` }
							name="brief"
							placeholder="краткое описание"
							value={ brief }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>полное описание</span>
						<textarea
							className="textarea"
							name="description"
							placeholder="полное описание"
							value={ description }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						{ !isExistingStyleEdited
							? (
								<>
									<button
										className="button"
										type="button"
										onClick={ () => dispatch(clearCeramicStyleForm()) }
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
										onClick={ handleUpdateCeramicStyle }
										disabled={ isFormDisabled }
									>
										Сохранить
									</button>
									<button
										className="button"
										type="button"
										onClick={ handleDeleteCeramicStyle }
									>
										Удалить
									</button>
								</>
							) }
					</div>
				</div>
			</fieldset>
			<span className="form__submit-status">{ saveMessage }</span>
		</form>

	);
}
