import type { RootState } from '@/slices/admin';
import type { ChangeEvent } from 'react';
import { setCategories } from '@/slices/admin/categories';
import { setCeramicStyles } from '@/slices/admin/ceramicStyles';
import { clearExhibitForm, setExhibits, setExhibitToEdit, setIsExistingExhibitEdited } from '@/slices/admin/exibits';
import { api } from '@/utils/api/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ExhibitForm() {
	const dispatch = useDispatch();

	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);
	const exhibitToEdit = useSelector((state: RootState) => state.exhibits.exhibitToEdit);
	const isExistingExhibitEdited = useSelector((state: RootState) => state.exhibits.isExistingExhibitEdited);
	const categories = useSelector((state: RootState) => state.categories.categories);
	const styles = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);

	function handleCreateExhibit() {
		console.error('Need some logic here!');
	};

	function handleUpdateExhibit() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibits.updateExhibit(token, { ...exhibitToEdit })
				.then((response) => {
					const newExhibitsList = exhibits.map((exhibit) => {
						return response.id !== exhibit.id ? exhibit : response;
					});
					dispatch(setExhibits(newExhibitsList));
					dispatch(setIsExistingExhibitEdited(false));
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

	const handleDeleteExhibit = () => {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibits.deleteExhibit(token, exhibitToEdit.id ?? 0)
				.then((response) => {
					const updatedExhibitsList = exhibits.filter(exhibit => exhibit.id !== response.id);
					dispatch(setExhibits(updatedExhibitsList));
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
	};

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setExhibitToEdit({ ...exhibitToEdit, [name]: value }));
	};

	function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
		const { value } = event.target;
		const categoryTitle = categories.find(category => category._id === value)?.title || '';
		dispatch(setExhibitToEdit({ ...exhibitToEdit, category: { _id: value, title: categoryTitle } }));
	};

	function handleSelectStyleChange(event: ChangeEvent<HTMLSelectElement>) {
		const { value } = event.target;
		const styleTitle = styles.find(style => style.name === value)?.title || '';
		dispatch(setExhibitToEdit({ ...exhibitToEdit, style: { name: value, title: styleTitle } }));
	};

	function handleChangePhotos(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setExhibitToEdit({ ...exhibitToEdit, [name]: value.replace(/\s/g, ',').split(',') }));
	};

	useEffect(() => {
		if (saveMessage) {
			setTimeout(() => setSaveMessage(''), 3000);
		}
	}, [saveMessage]);

	useEffect(() => {
		if (categories.length === 0) {
			api.categories.getCategories(true)
				.then((response) => {
					dispatch(setCategories(response));
				})
				.catch(error => console.error(error));
		}

		if (styles.length === 0) {
			api.ceramicStyles.getCeramicStyles(true)
				.then((styles) => {
					dispatch(setCeramicStyles(styles));
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<form className="form" onSubmit={() => {}}>
			<fieldset className="form__fieldset" disabled={isFormDisabled}>
				<legend className="form__legend">Добавить лот</legend>

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
							value={exhibitToEdit.id}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-4">
						<span>стиль керамики</span>

						<select
							className="select"
							name="style"
							value={exhibitToEdit.style?.name}
							onChange={event => handleSelectStyleChange(event)}
						>
							{styles.map(style => <option key={style.name} value={style.name}>{style.title}</option>)}
						</select>
					</div>

					<div className="form__row form__row-3">
						<span>категория</span>

						<select
							className="select"
							name="category"
							value={exhibitToEdit.category._id}
							onChange={event => handleSelectChange(event)}
						>
							{categories.map(category => <option key={category._id} value={category._id}>{category.title}</option>)}
						</select>
					</div>

					<div className="form__row form__row-3">
						<span>дата создания</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="age"
							placeholder="даты"
							value={exhibitToEdit.age}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>название</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="name"
							placeholder="название"
							value={exhibitToEdit.name}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>фотографии</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="images"
							placeholder="фотографии"
							value={exhibitToEdit.images}
							onChange={handleChangePhotos}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>описание лота</span>
						<textarea
							className="textarea"
							name="description"
							placeholder="описание лота"
							value={exhibitToEdit.description}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-8">
						<span>имя мастера</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potterName"
							placeholder="имя мастера"
							value={exhibitToEdit.potterName}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-4">
						<span>годы жизни</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potterLifeDates"
							placeholder="годы жизни"
							value={exhibitToEdit.potterLifeDates}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-8">
						<span>имя мастера на японском</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potterJapaneseName"
							placeholder="имя мастера на японском"
							value={exhibitToEdit.potterJapaneseName}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-4">
						<span>фото мастера</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="potterPhoto"
							placeholder="фото мастера"
							value={exhibitToEdit.potterPhoto}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>информация о мастере</span>
						<textarea
							className="textarea"
							name="potterInfo"
							placeholder="информация о мастере"
							value={exhibitToEdit.potterInfo}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>дополнительная информация</span>
						<textarea
							className="textarea"
							name="additionalDescription"
							placeholder="дополнительная информация"
							value={exhibitToEdit.additionalDescription}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row-12">
						<span>дополнительные фотографии</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="additionalImages"
							placeholder="названия через запятую без пробелов с расширением"
							value={exhibitToEdit.additionalImages}
							onChange={handleChangePhotos}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>комплектность</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="complectation"
							placeholder="комплектность"
							value={exhibitToEdit.complectation}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12">
						<span>сохранность</span>
						<input
							className={`input ${
								isFormDisabled ? 'input_disabled' : ''
							}`}
							type="text"
							name="preservation"
							placeholder="сохранность"
							value={exhibitToEdit.preservation}
							onChange={handleChange}
						/>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						{!isExistingExhibitEdited && (
							<>
								<button
									className="button"
									type="button"
									onClick={() => { dispatch(clearExhibitForm()); }}
								>
									Очистить
								</button>
								<button
									className="button"
									type="button"
									onClick={handleCreateExhibit}
									disabled={isFormDisabled}
								>
									Создать
								</button>
							</>
						)}

						{ isExistingExhibitEdited && (
							<>
								<button
									className="button"
									type="button"
									onClick={handleUpdateExhibit}
									disabled={isFormDisabled}
								>
									Сохранить
								</button>
								<button className="button" type="button" onClick={handleDeleteExhibit}>
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
