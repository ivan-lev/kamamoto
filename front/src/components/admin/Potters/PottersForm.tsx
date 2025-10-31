import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import type { Potter } from '@/types/potter';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/shared/Button';
import { clearPotterForm, setPotters, setPotterToEdit } from '@/slices/admin/potters';
import { api } from '@/utils/api/api';
import errorHandler from '@/utils/errorHandler';

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
	} = potterToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setPotterToEdit({ ...potterToEdit, [name]: value }));
	};

	async function handleCreatePotter() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			try {
				const response = await api.potters.createPotter(token, potterToEdit);

				const updatedPottersList = [...pottersList, response];
				dispatch(setPotters(updatedPottersList));
				dispatch(clearPotterForm());
				setIsFormDisabled(false);
				setSaveMessage('Гончар создан');
			}
			catch (error: any) {
				setIsFormDisabled(false);
				const errorJson = await error.json();
				setSaveMessage(errorHandler(errorJson));
			}
		}
	};

	function handleUpdatePotter() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.potters.updatePotter(token, potterToEdit)
				.then((response: Potter) => {
					const updatedPottersList = pottersList.map(potter => potter.id !== response.id ? potter : response);

					dispatch(setPotters(updatedPottersList));
					setIsFormDisabled(false);
					setSaveMessage('Данные обновлены');
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage(errorHandler(error).json());
				});
		}
	};

	function handleDeletePotter() {
		setIsFormDisabled(true);
		const token = localStorage.getItem('kmmttkn');
		if (token) {
			api.potters.deletePotter(token, potterToEdit.id)
				.then((response) => {
					const updatedPottersList = pottersList.filter(potter => potter.id !== response.id);
					dispatch(setPotters(updatedPottersList));
					dispatch(clearPotterForm());
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error);
					setIsFormDisabled(false);
					setSaveMessage(errorHandler(error.json()));
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
				<legend>Добавить гончара</legend>

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
				</div>
			</fieldset>
		</form>

	);
}
