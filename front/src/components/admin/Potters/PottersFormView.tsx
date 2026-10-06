import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import type { Potter } from '@/types/potter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleForm from '@/components/admin/shared/ArticleForm/ArticleForm';
import Button from '@/components/shared/Button';
import { clearPotterForm, setPotters, setPotterToEdit } from '@/slices/admin/potters';
import { api } from '@/utils/api/api';
import { getErrorMessage } from '@/utils/api/api.common';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

export default function PottersForm() {
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const dispatch = useDispatch();

	const pottersList = useSelector((state: RootState) => state.potters.pottersList);
	const isExistingPotterEdited = useSelector((state: RootState) => state.potters.isExistingPotterEdited);
	const potterToEdit = useSelector((state: RootState) => state.potters.potterToEdit);

	const {
		id,
		name,
		japaneseName,
		lifeDates,
		photo,
		info,
		isLNT,
		showArticle,
	} = potterToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setPotterToEdit({ ...potterToEdit, [name]: value }));
	};

	function handleCheckBox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setPotterToEdit({ ...potterToEdit, [name]: checked }));
	};

	async function handleCreatePotter() {
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.potters.createPotter(token, potterToEdit);

				const updatedPottersList = [...pottersList, response];
				dispatch(setPotters(updatedPottersList));
				dispatch(clearPotterForm());
				setIsFormDisabled(false);
				setSaveMessage('Гончар создан');
			}
			catch (error) {
				setIsFormDisabled(false);
				setSaveMessage(getErrorMessage(error));
			}
		}
	};

	async function handleUpdatePotter() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const response: Potter = await api.potters.updatePotter(token, potterToEdit);
			dispatch(setPotters(pottersList.map(potter => potter.id !== response.id ? potter : response)));
			setSaveMessage('Данные обновлены');
		}
		catch (error) {
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setIsFormDisabled(false);
		}
	}

	async function handleDeletePotter() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const response = await api.potters.deletePotter(token, potterToEdit.id);
			dispatch(setPotters(pottersList.filter(potter => potter.id !== response.id)));
			dispatch(clearPotterForm());
		}
		catch (error) {
			console.error(error);
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setIsFormDisabled(false);
		}
	}

	useEffect(() => {
		if (saveMessage) {
			setTimeout(setSaveMessage, 3000, '');
		}
	}, [saveMessage]);

	return (
		<form className="form" inert={ isFormDisabled }>
			<fieldset className="form__fieldset">
				<legend>{ !isExistingPotterEdited ? 'Добавить гончара' : 'Редактировать гончара' }</legend>

				<div className="form__grid">
					<div className="form__row form__row-4">
						<span>id</span>
						<input
							className="input"
							type="text"
							name="id"
							placeholder="id"
							value={ id }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>имя мастера</span>
						<input
							className="input"
							type="text"
							name="name"
							placeholder="имя мастера"
							value={ name }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>имя на японском</span>
						<input
							className="input"
							type="text"
							name="japaneseName"
							placeholder="имя на японском"
							value={ japaneseName }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>годы жизни</span>
						<input
							className="input"
							type="text"
							name="lifeDates"
							placeholder="годы жизни"
							value={ lifeDates }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>фото мастера</span>
						<input
							className="input"
							type="text"
							name="photo"
							placeholder="фото мастера"
							value={ photo }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row">
						<span>ЛНТ</span>
						<label className={ `checkbox-label ${isLNT ? 'checkbox-label--checked' : ''}` }>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={ isLNT }
								name="isLNT"
								onChange={ handleCheckBox }
							/>
						</label>
					</div>

					<div className="form__row form__row-2">
						<span>Показать статью</span>
						<label className={ `checkbox-label ${showArticle ? 'checkbox-label--checked' : ''} ` }>
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
						<span>информация о мастере</span>
						<textarea
							className="textarea"
							name="info"
							placeholder="информация о мастере"
							value={ info }
							onChange={ handleChange }
						/>
					</div>

				</div>
			</fieldset>
			<ArticleForm
				entity={ potterToEdit }
				onChange={ updatedPotter => dispatch(setPotterToEdit(updatedPotter)) }
				slidesStorage={{ target: 'potters', key: potterToEdit.id, emptyKeyHint: 'Чтобы загружать слайды, сначала укажите id гончара' }}
			/>

			<div className="form__row form__row-12 form__row-12--inline">
				<span className="form__request-status">{ saveMessage }</span>
				{ !isExistingPotterEdited && (
					<>
						<Button title="Очистить" action={ () => dispatch(clearPotterForm()) } />
						<Button title="Создать" action={ handleCreatePotter } />
					</>
				) }

				{ isExistingPotterEdited && (
					<>
						{ showConfirmation
							? (
								<>
									<span>Точно удалить запись?</span>
									<Button title="Да" action={ handleDeletePotter } />
									<Button title="Нет" action={ () => setShowConfirmation(false) } />
								</>
							)
							: (
								<>
									<Button title="Обновить" action={ handleUpdatePotter } />
									<Button title="Удалить" action={ () => setShowConfirmation(true) } />
								</>
							) }
					</>
				) }
			</div>
		</form>

	);
}
