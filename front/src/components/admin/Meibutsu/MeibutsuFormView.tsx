import type { ChangeEvent } from 'react';
import type { PendingImage } from '@/components/admin/shared/ImageDropzone/ImageDropzone';
import type { RootState } from '@/slices/admin';
import type { Meibutsu } from '@/types/meibutsu';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleForm from '@/components/admin/shared/ArticleForm/ArticleForm';
import ImageDropzone from '@/components/admin/shared/ImageDropzone/ImageDropzone';
import RichTextEditor from '@/components/admin/shared/RichTextEditor/RichTextEditor';
import Button from '@/components/shared/Button';
import { clearMeibutsuForm, setMeibutsu, setMeibutsuToEdit } from '@/slices/admin/meibutsu';
import { api } from '@/utils/api/api';
import { getErrorMessage } from '@/utils/api/api.common';
import { storage } from '@/utils/storage';
import { PATHS, STORAGE_KEYS } from '@/variables/variables';

// Форматы — как в IMAGE_TARGETS['meibutsu'] и meibutsuValidator на бэкенде
const PHOTO_MIME_TYPES = ['image/jpeg', 'image/webp'];

export default function MeibutsuFormView() {
	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	// фото выбирается сразу, а загружается при сохранении — чтобы брошенные правки не оставляли файлов
	const [pendingPhoto, setPendingPhoto] = useState<PendingImage>();
	const dispatch = useDispatch();

	const meibutsuList = useSelector((state: RootState) => state.meibutsu.meibutsuList);
	const isExistingMeibutsuEdited = useSelector((state: RootState) => state.meibutsu.isExistingMeibutsuEdited);
	const meibutsuToEdit = useSelector((state: RootState) => state.meibutsu.meibutsuToEdit);

	const {
		id,
		name,
		japaneseName,
		photo,
		info,
		showArticle,
	} = meibutsuToEdit;

	// id на момент открытия формы: по нему PATCH находит запись, даже если id сменили
	const initialId = useRef<string>('');

	useEffect(() => {
		if (!initialId.current)
			initialId.current = meibutsuToEdit.id;
		return () => {
			initialId.current = '';
		};
	}, [meibutsuToEdit.id]);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		dispatch(setMeibutsuToEdit({ ...meibutsuToEdit, [name]: value }));
	};

	function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setMeibutsuToEdit({ ...meibutsuToEdit, [name]: checked }));
	};

	function handleInfoChange(value: string) {
		dispatch(setMeibutsuToEdit({ ...meibutsuToEdit, info: value }));
	};

	function handlePhotoSelect(file: File) {
		handlePhotoRemove();
		setPendingPhoto({
			file,
			previewUrl: URL.createObjectURL(file),
		});
	};

	// Сначала отменяет выбранный файл, повторное нажатие убирает и сохранённое фото
	function handlePhotoRemove() {
		if (pendingPhoto) {
			URL.revokeObjectURL(pendingPhoto.previewUrl);
			setPendingPhoto(undefined);
			return;
		}
		dispatch(setMeibutsuToEdit({ ...meibutsuToEdit, photo: '' }));
	};

	// Фото загружается только при сохранении и называется по id вещи (kizaemon.webp),
	// поэтому без id сохранить его нельзя. Старое фото удаляет бэкенд при сохранении записи
	async function getMeibutsuWithUploadedPhoto(token: string): Promise<Meibutsu> {
		const meibutsuId = meibutsuToEdit.id.trim();
		let meibutsu = meibutsuToEdit;

		if (pendingPhoto) {
			if (!meibutsuId)
				throw new Error('Чтобы загрузить фото, сначала укажите id вещи');

			const { filename } = await api.uploads.uploadImage(token, PATHS.MEIBUTSU, pendingPhoto.file, { filename: meibutsuId, key: meibutsuId });
			meibutsu = { ...meibutsu, photo: filename };
			dispatch(setMeibutsuToEdit(meibutsu));
			handlePhotoRemove();
		}

		return meibutsu;
	};

	async function handleCreateMeibutsu() {
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.meibutsu.createMeibutsu(token, await getMeibutsuWithUploadedPhoto(token));

				const updatedList = [...meibutsuList, response];
				updatedList.sort((a, b) => (a.name > b.name)
					? 1
					: ((b.name > a.name)
						? -1
						: 0));

				dispatch(setMeibutsu(updatedList));
				dispatch(clearMeibutsuForm());
				setIsFormDisabled(false);
				setSaveMessage('Вещь с именем создана');
			}
			catch (error) {
				setIsFormDisabled(false);
				setSaveMessage(getErrorMessage(error));
			}
		}
	};

	async function handleUpdateMeibutsu() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const response: Meibutsu = await api.meibutsu.updateMeibutsu(token, await getMeibutsuWithUploadedPhoto(token), initialId.current);
			// id могли сменить, поэтому заменяем запись по прежнему id
			dispatch(setMeibutsu(meibutsuList.map(item => item.id !== initialId.current
				? item
				: response)));
			setSaveMessage('Данные обновлены');
		}
		catch (error) {
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setIsFormDisabled(false);
		}
	};

	async function handleDeleteMeibutsu() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const response = await api.meibutsu.deleteMeibutsu(token, meibutsuToEdit.id);
			dispatch(setMeibutsu(meibutsuList.filter(item => item.id !== response.id)));
			dispatch(clearMeibutsuForm());
		}
		catch (error) {
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setIsFormDisabled(false);
		}
	};

	useEffect(() => {
		if (saveMessage) {
			setTimeout(setSaveMessage, 3000, '');
		}
	}, [saveMessage]);

	function getPhotoPreviewSrc() {
		return pendingPhoto?.previewUrl
			?? (photo
				? `${PATHS.STATIC_URL}/${PATHS.MEIBUTSU}/${id}/${photo}`
				: undefined);
	};

	function getPhotoHint() {
		if (!pendingPhoto)
			return undefined;
		return id.trim()
			? `Загрузится при сохранении под именем «${id.trim()}». Можно перетащить другую`
			: 'Загрузится при сохранении под именем по id вещи — не забудьте его указать';
	};

	return (
		<form className="form" inert={ isFormDisabled }>
			<fieldset className="form__fieldset">
				<legend>
					{ !isExistingMeibutsuEdited
						? 'Добавить вещь с именем'
						: 'Редактировать вещь с именем' }
				</legend>

				<div className="form__grid">
					<div className="form__row form__row-4">
						<span>id</span>
						<input
							className="input"
							type="text"
							name="id"
							placeholder="латиницей, например kizaemon-chawan"
							value={ id }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>название</span>
						<input
							className="input"
							type="text"
							name="name"
							placeholder="название вещи"
							value={ name }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>название на японском</span>
						<input
							className="input"
							type="text"
							name="japaneseName"
							placeholder="название на японском"
							value={ japaneseName }
							onChange={ handleChange }
						/>
					</div>

					<div className="form__row form__row-4">
						<span>Показать статью</span>
						<label className={ `checkbox-label ${showArticle ? 'checkbox-label--checked' : ''} ` }>
							<input
								className="checkbox-input"
								type="checkbox"
								checked={ showArticle }
								name="showArticle"
								onChange={ handleCheckbox }
							/>
						</label>
					</div>

					<ImageDropzone
						label="фото вещи"
						rowClassName="form__row-4"
						previewSrc={ getPhotoPreviewSrc() }
						filename={ pendingPhoto?.file.name ?? photo }
						mimeTypes={ PHOTO_MIME_TYPES }
						hint={ getPhotoHint() }
						onSelect={ handlePhotoSelect }
						onRemove={ handlePhotoRemove }
					/>

					<div className="form__row form__row-12">
						<span>краткая информация</span>
						<RichTextEditor
							value={ info }
							placeholder="краткая информация о вещи"
							onChange={ handleInfoChange }
						/>
					</div>
				</div>
			</fieldset>

			<ArticleForm
				entity={ meibutsuToEdit }
				onChange={ updatedMeibutsu => dispatch(setMeibutsuToEdit(updatedMeibutsu)) }
				slidesStorage={{ target: 'meibutsu', key: meibutsuToEdit.id, emptyKeyHint: 'Чтобы загружать слайды, сначала укажите id вещи' }}
			/>

			<div className="form__row form__row-12 form__row-12--inline">
				<span className="form__request-status">{ saveMessage }</span>
				{ !isExistingMeibutsuEdited && (
					<>
						<Button title="Очистить" action={ () => dispatch(clearMeibutsuForm()) } />
						<Button title="Создать" action={ handleCreateMeibutsu } />
					</>
				) }

				{ isExistingMeibutsuEdited && (
					<>
						{ showConfirmation
							? (
								<>
									<span>Точно удалить запись?</span>
									<Button title="Да" action={ handleDeleteMeibutsu } />
									<Button title="Нет" action={ () => setShowConfirmation(false) } />
								</>
							)
							: (
								<>
									<Button title="Обновить" action={ handleUpdateMeibutsu } />
									<Button title="Удалить" action={ () => setShowConfirmation(true) } />
								</>
							) }
					</>
				) }
			</div>
		</form>
	);
}
