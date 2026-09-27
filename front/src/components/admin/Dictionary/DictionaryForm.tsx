import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import type { Term } from '@/types/term';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageDropzone from '@/components/admin/shared/ImageDropzone/ImageDropzone';
import Button from '@/components/shared/Button';
import { clearTermForm, setIsExistingTermEdited, setTerms, setTermToEdit } from '@/slices/admin/dictionary';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { PATHS, STORAGE_KEYS } from '@/variables/variables';

// Форматы, которые бэкенд принимает для картинок словаря (IMAGE_TARGETS в back/src/utils/images.ts)
const IMAGE_MIME_TYPES = ['image/jpeg', 'image/webp'];

// Выбранная, но ещё не загруженная картинка
interface PendingImage {
	file: File;
	previewUrl: string;
}

interface Props {
	closeModal: () => void;
}

export default function DictionaryForm({ closeModal }: Props) {
	const dispatch = useDispatch();
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);

	const terms = useSelector((state: RootState) => state.dictionary.terms);
	const termToEdit = useSelector((state: RootState) => state.dictionary.termToEdit);
	const isExistingTermEdited = useSelector(
		(state: RootState) => state.dictionary.isExistingTermEdited,
	);

	const { title, id, kanji, romaji, image, definition, letter } = termToEdit;

	const imagePreviewSrc = pendingImage?.previewUrl
		?? (image ? `${PATHS.STATIC_URL}/${PATHS.DICTIONARY}/${image}` : undefined);

	function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const { name, value } = event.target;
		dispatch(setTermToEdit({ ...termToEdit, [name]: value }));
	}

	function handleImageSelect(file: File) {
		if (pendingImage)
			URL.revokeObjectURL(pendingImage.previewUrl);
		setPendingImage({ file, previewUrl: URL.createObjectURL(file) });
	}

	function clearPendingImage() {
		if (pendingImage)
			URL.revokeObjectURL(pendingImage.previewUrl);
		setPendingImage(null);
	}

	// Сначала отменяет выбранный файл, повторное нажатие убирает и сохранённую картинку
	function handleImageRemove() {
		if (pendingImage) {
			clearPendingImage();
			return;
		}
		dispatch(setTermToEdit({ ...termToEdit, image: '' }));
	}

	function handleClearForm() {
		clearPendingImage();
		dispatch(clearTermForm());
	}

	// Новая картинка загружается только при сохранении, чтобы на сервере не копились файлы от брошенных правок.
	// Имя загруженного файла сразу пишем в форму: если сохранение термина упадёт, повторно файл не загрузится.
	// Старую картинку удаляет бэкенд, когда термин сохранится с новой
	async function getTermWithUploadedImage(token: string): Promise<Term> {
		if (!pendingImage)
			return termToEdit;

		const { filename } = await api.uploads.uploadImage(token, PATHS.DICTIONARY, pendingImage.file, termToEdit.id.trim());
		const termWithImage = { ...termToEdit, image: filename };
		dispatch(setTermToEdit(termWithImage));
		clearPendingImage();
		return termWithImage;
	}

	async function handleCreateTerm() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const createdTerm = await api.terms.createTerm(token, await getTermWithUploadedImage(token));
			dispatch(setTerms([...terms, createdTerm]));
			dispatch(clearTermForm());
			dispatch(setIsExistingTermEdited(false));
			setSaveMessage('Новый термин в базе');
			setTimeout(closeModal, 1000);
		}
		catch (error) {
			setSaveMessage((error instanceof Error && error.message) || 'Что-то пошло не так :(');
		}
		finally {
			setIsFormDisabled(false);
		}
	}

	async function handleUpdateTerm() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const updatedTerm = await api.terms.updateTerm(token, await getTermWithUploadedImage(token));
			const newTermsList = terms.map((term) => {
				return updatedTerm.id !== term.id ? term : updatedTerm;
			});
			dispatch(setTerms(newTermsList));
			dispatch(clearTermForm());
			dispatch(setIsExistingTermEdited(false));
			setSaveMessage('Данные обновлены');
		}
		catch (error) {
			setSaveMessage((error instanceof Error && error.message) || 'Что-то пошло не так :(');
		}
		finally {
			setIsFormDisabled(false);
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
							value={ letter.toLowerCase() }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row-6">
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

					<div className="form__row-6">
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

					<ImageDropzone
						previewSrc={ imagePreviewSrc }
						filename={ pendingImage?.file.name ?? image }
						mimeTypes={ IMAGE_MIME_TYPES }
						hint={ pendingImage ? 'Новая картинка загрузится при сохранении. Можно перетащить другую' : undefined }
						onSelect={ handleImageSelect }
						onRemove={ handleImageRemove }
					/>

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
									<Button title="Очистить" action={ handleClearForm } />
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
