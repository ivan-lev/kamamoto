import type { PendingStyleImages, StyleImageSlot } from '@/components/admin/CeramicStyles/CeramicStyleFormBasicInfo';
import type { RootState } from '@/slices/admin';
import type { CeramicStyle } from '@/types/ceramicStyles';
import type { UploadedImage } from '@/utils/api/api.uploads';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CeramicStyleFormBasicInfo, { STYLE_IMAGE_FIELDS } from '@/components/admin/CeramicStyles/CeramicStyleFormBasicInfo';
import ArticleForm from '@/components/admin/shared/ArticleForm/ArticleForm';
import { clearCeramicStyleForm, setCeramicStyles, setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';
import { api } from '@/utils/api/api';
import { getErrorMessage } from '@/utils/api/api.common';
import { storage } from '@/utils/storage';
import { PATHS, STORAGE_KEYS } from '@/variables/variables';

export default function CeramicStyleFormView() {
	const dispatch = useDispatch();
	const ceramicStylesList = useSelector((state: RootState) => state.ceramicStyles.ceramicStylesList);
	const isExistingStyleEdited = useSelector((state: RootState) => state.ceramicStyles.isExistingStyleEdited);
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);

	const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);
	const [saveMessage, setSaveMessage] = useState<string>('');
	const [pendingImages, setPendingImages] = useState<PendingStyleImages>({});
	// og-картинка лежит только на диске, поэтому её состояние живёт в форме, а не в записи
	const [ogImage, setOgImage] = useState<UploadedImage | null>(null);
	const [isOgImageRemoved, setIsOgImageRemoved] = useState<boolean>(false);
	// имя стиля на момент открытия формы: по нему ищем уже загруженную og-картинку
	const [openedStyleName] = useState<string>(isExistingStyleEdited ? ceramicStyleToEdit.name : '');
	const initialStyleName = useRef<string>('');

	function handleImageSelect(slot: StyleImageSlot, file: File) {
		clearPendingImage(slot);
		setPendingImages(images => ({ ...images, [slot]: { file, previewUrl: URL.createObjectURL(file) } }));
	}

	function clearPendingImage(slot: StyleImageSlot) {
		const pendingImage = pendingImages[slot];
		if (pendingImage)
			URL.revokeObjectURL(pendingImage.previewUrl);
		setPendingImages(images => ({ ...images, [slot]: undefined }));
	}

	// Сначала отменяет выбранный файл, повторное нажатие убирает и сохранённую картинку
	function handleImageRemove(slot: StyleImageSlot) {
		if (pendingImages[slot]) {
			clearPendingImage(slot);
			return;
		}
		if (slot === 'og') {
			setIsOgImageRemoved(true);
			return;
		}
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [slot]: '' }));
	}

	function handleClearForm() {
		[...STYLE_IMAGE_FIELDS, 'og' as const].forEach(clearPendingImage);
		dispatch(clearCeramicStyleForm());
	}

	// Новые картинки загружаются только при сохранении, чтобы на сервере не копились файлы от брошенных правок.
	// Файл называется по имени стиля (bizen.webp, bizen.svg) и лежит в его папке рядом со слайдами.
	// Имя загруженного файла сразу пишем в форму: если сохранение стиля упадёт, повторно файл не загрузится.
	// Старые картинки удаляет бэкенд, когда стиль сохранится с новыми
	async function getStyleWithUploadedImages(token: string): Promise<CeramicStyle> {
		const styleName = ceramicStyleToEdit.name.trim();
		let style = ceramicStyleToEdit;

		for (const field of STYLE_IMAGE_FIELDS) {
			const pendingImage = pendingImages[field];
			if (!pendingImage)
				continue;

			if (!styleName)
				throw new Error('Чтобы загрузить картинки, сначала укажите имя стиля');

			const { filename } = await api.uploads.uploadImage(token, PATHS.CERAMIC_STYLES, pendingImage.file, { filename: styleName, key: styleName });
			style = { ...style, [field]: filename };
			dispatch(setCeramicStyleToEdit(style));
			clearPendingImage(field);
		}

		return style;
	}

	// og-картинку бэк ищет по имени файла (og.jpg / og.webp) в папке стиля, в записи она не хранится.
	// Поэтому загружаем её после сохранения стиля — в папку с его итоговым именем, и только при сохранении,
	// как и остальные картинки
	async function saveOgImage(token: string, styleName: string) {
		if (pendingImages.og) {
			setOgImage(await api.uploads.uploadOgImage(token, PATHS.CERAMIC_STYLES, styleName, pendingImages.og.file));
			clearPendingImage('og');
		}
		else if (isOgImageRemoved) {
			await api.uploads.deleteOgImage(token, PATHS.CERAMIC_STYLES, styleName);
			setOgImage(null);
		}
		setIsOgImageRemoved(false);
	}

	async function handleCreateCeramicStyle(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.ceramicStyles.createCeramicStyle(token, await getStyleWithUploadedImages(token));
				await saveOgImage(token, response.name);

				const newCeramicStylesListData: CeramicStyle[] = [...ceramicStylesList, response];
				newCeramicStylesListData.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));

				dispatch(setCeramicStyles(newCeramicStylesListData));
				dispatch(clearCeramicStyleForm());
				setOgImage(null);
				setIsFormDisabled(false);
				setSaveMessage('Стиль керамики создан');
			}
			catch (error) {
				setIsFormDisabled(false);
				setSaveMessage(getErrorMessage(error));
			}
		}
	};

	async function handleUpdateCeramicStyle() {
		setIsFormDisabled(true);
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (token) {
			try {
				const response = await api.ceramicStyles.updateCeramicStyle(token, await getStyleWithUploadedImages(token), initialStyleName.current);
				await saveOgImage(token, response.name);
				const updatedStylesList = ceramicStylesList.map(style => style.name !== initialStyleName.current ? style : response);

				dispatch(setCeramicStyles(updatedStylesList));
				setIsFormDisabled(false);
				setSaveMessage('Данные обновлены');
			}
			catch (error) {
				setIsFormDisabled(false);
				setSaveMessage(getErrorMessage(error));
			};
		}
	};

	async function handleDeleteCeramicStyle() {
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);
		if (!token)
			return;

		setIsFormDisabled(true);
		try {
			const response = await api.ceramicStyles.deleteCeramicStyle(token, ceramicStyleToEdit.name);
			dispatch(setCeramicStyles(ceramicStylesList.filter(style => style.name !== response.name)));
			dispatch(clearCeramicStyleForm());
		}
		catch (error) {
			setSaveMessage(getErrorMessage(error));
		}
		finally {
			setIsFormDisabled(false);
		}
	}

	useEffect(() => {
		if (!openedStyleName)
			return;

		let isActual = true;

		async function fetchOgImage(name: string) {
			try {
				const image = await api.uploads.getOgImage(PATHS.CERAMIC_STYLES, name);
				if (isActual)
					setOgImage(image);
			}
			catch (error) {
				console.error(error);
			}
		}

		fetchOgImage(openedStyleName);
		return () => {
			isActual = false;
		};
	}, [openedStyleName]);

	useEffect(() => {
		if (saveMessage) {
			setTimeout(setSaveMessage, 3000, '');
		}
	}, [saveMessage]);

	useEffect(() => {
		// set initial style name to pass it to backend
		// if it was changed on edit
		if (!initialStyleName.current)
			initialStyleName.current = ceramicStyleToEdit.name;
		return () => {
			initialStyleName.current = '';
		};
	}, [ceramicStyleToEdit.name]);

	return (
		<form
			className="form"
			onSubmit={ handleCreateCeramicStyle }
			inert={ isFormDisabled }
		>

			<CeramicStyleFormBasicInfo
				pendingImages={ pendingImages }
				ogImage={ isOgImageRemoved ? null : ogImage }
				onImageSelect={ handleImageSelect }
				onImageRemove={ handleImageRemove }
			/>

			<ArticleForm
				entity={ ceramicStyleToEdit }
				onChange={ updatedStyle => dispatch(setCeramicStyleToEdit(updatedStyle)) }
				slidesStorage={{ target: 'ceramic-styles', key: ceramicStyleToEdit.name, emptyKeyHint: 'Чтобы загружать слайды, сначала укажите имя стиля' }}
			/>

			<div className="form__row form__row-12 form__row-12--inline">
				<span className="form__request-status">{ saveMessage }</span>
				{ !isExistingStyleEdited
					? (
						<>
							<button
								className="button"
								type="button"
								onClick={ handleClearForm }
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
		</form>
	);
}
