import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/shared/Button';
import { clearTermForm, setIsExistingTermEdited, setTerms, setTermToEdit } from '@/slices/admin/dictionary';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

interface Props {
	closeModal: () => void;
}

export default function DictionaryForm({ closeModal }: Props) {
	const dispatch = useDispatch();
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');

	const terms = useSelector((state: RootState) => state.dictionary.terms);
	const termToEdit = useSelector((state: RootState) => state.dictionary.termToEdit);
	const isExistingTermEdited = useSelector(
		(state: RootState) => state.dictionary.isExistingTermEdited,
	);

	const { title, id, kanji, romaji, image, definition, letter } = termToEdit;

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setTermToEdit({ ...termToEdit, [name]: value }));
	}

	function handleCreateTerm() {
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			api.terms.createTerm(token, termToEdit)
				.then((response) => {
					dispatch(setTerms([...terms, response]));
					dispatch(clearTermForm());
					dispatch(setIsExistingTermEdited(false));
					setIsFormDisabled(false);
					setSaveMessage('Новый термин в базе');
					setTimeout(closeModal, 1000);
				})
				.catch((error) => {
					setIsFormDisabled(false);
					setSaveMessage(error.message || 'Что-то пошло не так :(');
				});
		}
	}

	function handleUpdateTerm() {
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			api.terms.updateTerm(token, termToEdit)
				.then((response) => {
					const newTermsList = terms.map((term) => {
						return response.id !== term.id ? term : response;
					});
					dispatch(setTerms(newTermsList));
					dispatch(clearTermForm());
					dispatch(setIsExistingTermEdited(false));
					setIsFormDisabled(false);
					setSaveMessage('Данные обновлены');
				})
				.catch((error) => {
					setIsFormDisabled(false);
					setSaveMessage(error.message || 'Что-то пошло не так :(');
				});
		}
	}

	function handleDeleteTerm() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			api.terms.deleteTerm(token, id)
				.then((response) => {
					const newTermsList = terms.filter(term => term.id !== response.id);
					dispatch(setTerms(newTermsList));
					dispatch(clearTermForm());
					dispatch(setIsExistingTermEdited(false));
					setSaveMessage('Термин удалён');
					setTimeout(closeModal, 1000);
					setIsFormDisabled(false);
				})
				.catch((error) => {
					console.error(error.message);
					setIsFormDisabled(false);
				});
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
				<legend className="form__legend">
					{ !isExistingTermEdited ? 'Добавить термин' : 'Редактировать термин' }
				</legend>

				<div className="form__grid">
					<div className="form__row-4">
						<span>Заголовок</span>
						<input
							className="input"
							type="text"
							name="title"
							placeholder="по-русски"
							value={ title }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-4">
						<span>Id</span>
						<input
							className="input"
							type="text"
							name="id"
							placeholder="уникальное имя по-английски"
							value={ id }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-4">
						<span>Буква</span>
						<input
							className="input"
							type="text"
							name="letter"
							placeholder="первая буква термина"
							value={ letter }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-4">
						<span>Иероглифы</span>
						<input
							className="input"
							type="text"
							name="kanji"
							placeholder="кандзи термина"
							value={ kanji }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-4">
						<span>Ромадзи</span>
						<input
							className="input"
							type="text"
							name="romaji"
							placeholder="транслитерация"
							value={ romaji }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-4">
						<span>Файл картинки</span>
						<input
							className="input"
							type="text"
							name="image"
							placeholder="webp"
							value={ image }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12">
						<span>Определение</span>
						<textarea
							className="textarea"
							name="definition"
							placeholder="определение термина"
							value={ definition }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-12 form__row-12--inline">
						<span className="form__request-status">{ saveMessage }</span>
						{ !isExistingTermEdited
							? (
								<>
									<Button title="Очистить" action={ () => dispatch(clearTermForm()) } />
									<Button title="Добавить" action={ handleCreateTerm } />
								</>
							)
							: (
								<>
									{ showConfirmation && (
										<div className="form__confirmation">
											<span>Точно удалить запись?</span>
											<Button title="Да" action={ handleDeleteTerm } />
											<Button title="Нет" action={ () => setShowConfirmation(false) } />
										</div>
									) }
									{ !showConfirmation && (
										<>
											<Button title="Сохранить" action={ handleUpdateTerm } />
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
