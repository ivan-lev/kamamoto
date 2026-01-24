import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import type { Potter } from '@/types/potter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComplectationItem from '@/components/admin/ComplectationItem/ComplectationItem';
import Button from '@/components/shared/Button';
import Tag from '@/components/visitor/Tag/Tag';
import { setCategories } from '@/slices/admin/categories';
import { setCeramicStyles } from '@/slices/admin/ceramicStyles';
import { setComplectations } from '@/slices/admin/complectations';
import { clearExhibitForm, setExhibits, setExhibitToEdit } from '@/slices/admin/exhibits';
import { setPotters } from '@/slices/admin/potters';
import { api } from '@/utils/api/api';

export default function ExhibitForm() {
	const dispatch = useDispatch();

	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	// TO DO костыль - нужно переделать
	const [photoName, setPhotoName] = useState<string>('');
	const [additionalPhotoName, setAdditionalPhotoName] = useState<string>('');

	const exhibits = useSelector((state: RootState) => state.exhibits.exhibits);
	const exhibitToEdit = useSelector((state: RootState) => state.exhibits.exhibitToEdit);
	const isExistingExhibitEdited = useSelector((state: RootState) => state.exhibits.isExistingExhibitEdited);
	const categories = useSelector((state: RootState) => state.categories.categories);
	const styles = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);
	const complectations = useSelector((state: RootState) => state.complectations.complectations);
	const pottersList = useSelector((state: RootState) => state.potters.pottersList);

	const seasons = ['', 'весна', 'лето', 'осень', 'зима'];

	function handleCreateExhibit() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.exhibits.createExhibit(token, { ...exhibitToEdit })
				.then((response) => {
					dispatch(setExhibits([...exhibits, response]));
					dispatch(clearExhibitForm());
					setIsFormDisabled(false);
					setSaveMessage('Лот создан');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage('Что-то пошло не так :(');
				});
		}
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
		const categoryTitle = categories.find(category => category.name === value)?.title || '';
		dispatch(setExhibitToEdit({ ...exhibitToEdit, category: { name: value, title: categoryTitle } }));
	};

	function handleSeasonChange(event: ChangeEvent<HTMLSelectElement>) {
		const { name, value } = event.target;
		dispatch(setExhibitToEdit({ ...exhibitToEdit, [name]: value }));
	};

	function handleCheckBox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setExhibitToEdit({ ...exhibitToEdit, [name]: checked }));
	};

	function handleSelectStyleChange(event: ChangeEvent<HTMLSelectElement>) {
		const { value } = event.target;
		const styleTitle = styles.find(style => style.name === value)?.title || '';
		const mapImage = styles.find(style => style.name === value)?.mapImage || '';
		dispatch(setExhibitToEdit({ ...exhibitToEdit, style: { name: value, title: styleTitle, mapImage } }));
	};

	function handleChangePhotos(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setPhotoName(value);
		if (value.slice(-1) === ',' || value.slice(-1) === ' ') {
			dispatch(setExhibitToEdit({ ...exhibitToEdit, [name]: [...exhibitToEdit.images || [], value.substring(0, value.length - 1)] }));
			setPhotoName('');
		}
	};

	function handleChangeAdditionalPhotos(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		setAdditionalPhotoName(value);
		if (value.slice(-1) === ',' || value.slice(-1) === ' ') {
			dispatch(setExhibitToEdit({ ...exhibitToEdit, [name]: [...exhibitToEdit.additionalImages || [], value.substring(0, value.length - 1)] }));
			setAdditionalPhotoName('');
		}
	};

	// TO DO костыль - нужно унифицировать
	function handleDeletePhoto(photoToDelete: string) {
		const filteredPhotos = exhibitToEdit.images?.filter(photo => photo !== photoToDelete);
		dispatch(setExhibitToEdit({ ...exhibitToEdit, images: filteredPhotos }));
	}

	function handleDeleteAdditionalPhoto(photoToDelete: string) {
		const filteredPhotos = exhibitToEdit.additionalImages?.filter(photo => photo !== photoToDelete);
		dispatch(setExhibitToEdit({ ...exhibitToEdit, additionalImages: filteredPhotos }));
	}

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

		if (complectations.length === 0) {
			api.complectation.getComplections()
				.then((complectations) => {
					dispatch(setComplectations(complectations.toSorted((a, b) => a.title.localeCompare(b.title))));
				})
				.catch(error => console.error(error));
		}

		if (pottersList.length === 0) {
			api.potters.getPotters()
				.then((potters: Potter[]) => {
					dispatch(setPotters(potters.toSorted((a, b) => a.name.localeCompare(b.name))));
				})
				.catch(error => console.error(error));
		}
	}, []);

	return (
		<form className="form" inert={ isFormDisabled }>
			<fieldset className="form__fieldset">
				<legend>Добавить лот</legend>

				<div className="form__grid">
					<div className="form__row form__row-2">
						<span>номер</span>
						<input
							className="input"
							type="text"
							name="id"
							placeholder="id"
							value={ exhibitToEdit.id }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-10">
						<span>название</span>
						<input
							className="input"
							type="text"
							name="name"
							placeholder="название"
							value={ exhibitToEdit.name }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-2">
						<span>гончар</span>
						<select
							className="select"
							name="potter"
							value={ exhibitToEdit.potter }
							onChange={ event => handleSeasonChange(event) }
						>
							{ pottersList.map(potter => <option key={ potter.id } value={ potter._id }>{ potter.name }</option>) }
						</select>
					</div>

					<div className="form__row form__row-2">
						<span>стиль керамики</span>
						<select
							className="select"
							name="style"
							value={ exhibitToEdit.style?.name }
							onChange={ event => handleSelectStyleChange(event) }
						>
							{ styles.map(style => <option key={ style.name } value={ style.name }>{ style.title }</option>) }
						</select>
					</div>

					<div className="form__row form__row-2">
						<span>категория</span>

						<select
							className="select"
							name="category"
							value={ exhibitToEdit.category.name }
							onChange={ event => handleSelectChange(event) }
						>
							{ categories.map(category => <option key={ category.name } value={ category.name }>{ category.title }</option>) }
						</select>
					</div>

					<div className="form__row form__row-2">
						<span>дата создания</span>
						<input
							className="input"
							type="text"
							name="age"
							placeholder="даты"
							value={ exhibitToEdit.age }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>сезон</span>
						<select
							className="select"
							name="season"
							value={ exhibitToEdit.season }
							onChange={ event => handleSeasonChange(event) }
						>
							{ seasons.map(season => <option key={ season } value={ season }>{ season }</option>) }
						</select>
					</div>

					<div className="form__row form__row-2">
						<span>тхумб</span>
						<input
							className="input"
							type="text"
							name="thumbnail"
							placeholder="тхумб"
							value={ exhibitToEdit.thumbnail }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>актив</span>
						<label className={ `checkbox-label ${exhibitToEdit.isActive ? 'checkbox-label--checked' : ''} ` }>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={ exhibitToEdit.isActive }
								name="isActive"
								onChange={ handleCheckBox }
							/>
						</label>
					</div>

					<div className="form__row form__row-12">
						<span>фотографии</span>
						<input
							className="input"
							type="text"
							name="images"
							placeholder="фотографии"
							value={ photoName }
							onChange={ handleChangePhotos }
						/>
						<div className="tags">
							{ exhibitToEdit?.images?.map(image => <Tag key={ image } title={ image } action={ () => handleDeletePhoto(image) } />) }
						</div>
					</div>

					<div className="form__row form__row-12">
						<span>описание лота</span>
						<textarea
							className="textarea"
							name="description"
							placeholder="описание лота"
							value={ exhibitToEdit.description }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>дополнительная информация</span>
						<textarea
							className="textarea"
							name="additionalDescription"
							placeholder="дополнительная информация"
							value={ exhibitToEdit.additionalDescription }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>дополнительные фотографии</span>
						<input
							className="input"
							type="text"
							name="additionalImages"
							placeholder="названия через запятую без пробелов с расширением"
							value={ additionalPhotoName }
							onChange={ handleChangeAdditionalPhotos }
						/>
						<div className="tags">
							{ exhibitToEdit?.additionalImages?.map(image => <Tag key={ image } title={ image } action={ () => handleDeleteAdditionalPhoto(image) } />) }
						</div>
					</div>

					<div className="form__row form__row-1">
						<span>высота</span>
						<input
							className="input"
							type="text"
							name="height"
							placeholder="см"
							value={ exhibitToEdit.height }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>длина</span>
						<input
							className="input"
							type="text"
							name="length"
							placeholder="см"
							value={ exhibitToEdit.length }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>ширина</span>
						<input
							className="input"
							type="text"
							name="width"
							placeholder="см"
							value={ exhibitToEdit.width }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>&#8960;</span>
						<input
							className="input"
							type="text"
							name="diameter"
							placeholder="см"
							value={ exhibitToEdit.diameter }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>&#8960; ножки</span>
						<input
							className="input"
							type="text"
							name="footDiameter"
							placeholder="см"
							value={ exhibitToEdit.footDiameter }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>объём</span>
						<input
							className="input"
							type="text"
							name="volume"
							placeholder="см"
							value={ exhibitToEdit.volume }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>вес</span>
						<input
							className="input"
							type="text"
							name="weight"
							placeholder="г"
							value={ exhibitToEdit.weight }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-1">
						<span>вес набора</span>
						<input
							className="input"
							type="text"
							name="weightOfSet"
							placeholder="г"
							value={ exhibitToEdit.weightOfSet }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>комплектность</span>
						<div className="form__tags">
							{ complectations.map(complectation => <ComplectationItem key={ complectation.title } complectation={ complectation } />) }
						</div>
					</div>

					<div className="form__row form__row-10">
						<span>сохранность</span>
						<input
							className="input"
							type="text"
							name="preservation"
							placeholder="сохранность"
							value={ exhibitToEdit.preservation }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						<span className="form__request-status">{ saveMessage }</span>
						{ !isExistingExhibitEdited && (
							<>
								<Button title="Очистить" action={ () => dispatch(clearExhibitForm()) } />
								<Button title="Создать" action={ handleCreateExhibit } />
							</>
						) }

						{ isExistingExhibitEdited && (
							<>
								{ showConfirmation && (
									<>
										<span>Точно удалить запись?</span>
										<Button title="Да" action={ handleDeleteExhibit } />
										<Button title="Нет" action={ () => setShowConfirmation(false) } />
									</>
								) }
								{ !showConfirmation && (
									<>
										<Button title="Сохранить" action={ handleUpdateExhibit } />
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
