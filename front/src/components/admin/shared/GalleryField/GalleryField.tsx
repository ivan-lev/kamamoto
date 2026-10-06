import type { ChangeEvent, DragEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import SortableTags from '@/components/admin/shared/SortableTags/SortableTags';
import { api } from '@/utils/api/api';
import { getErrorMessage } from '@/utils/api/api.common';
import { storage } from '@/utils/storage';
import { ERROR_MESSAGES, STORAGE_KEYS } from '@/variables/variables';
import '@/components/admin/shared/GalleryField/GalleryField.scss';

interface Props {
	items: string[];
	onChange: (items: string[]) => void;
	// раздел на бэке (GALLERY_TARGETS) и ключ записи — папка, куда грузятся файлы
	target: string;
	uploadKey?: string;
	// подсказка, пока ключа нет (например, не заполнен номер лота)
	emptyKeyHint: string;
	// адрес той же папки в static/ для превью
	previewBaseUrl?: string;
}

// Фото записи: файлы загружаются сразу при перетаскивании или выборе, порядок меняется перетаскиванием тегов
export default function GalleryField({ items, onChange, target, uploadKey, emptyKeyHint, previewBaseUrl }: Props) {
	const [isDragOver, setIsDragOver] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	// Загрузка асинхронная: пока она идёт, список и форму могут поправить,
	// поэтому новые файлы добавляем к актуальному списку через актуальный onChange
	const latestItemsRef = useRef(items);
	const latestOnChangeRef = useRef(onChange);
	useEffect(() => {
		latestItemsRef.current = items;
		latestOnChangeRef.current = onChange;
	}, [items, onChange]);

	const isDisabled = !uploadKey || isUploading;

	async function uploadFiles(fileList: FileList | null) {
		const files = [...fileList ?? []].filter(file => file.type.startsWith('image/'));
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);

		if (!uploadKey || !token || !files.length)
			return;

		setIsUploading(true);
		setErrorMessage('');

		try {
			const uploadedImages = await api.uploads.uploadGallery(token, target, uploadKey, files);
			latestOnChangeRef.current([...latestItemsRef.current, ...uploadedImages.map(({ filename }) => filename)]);
		}
		catch (error) {
			setErrorMessage(getErrorMessage(error, ERROR_MESSAGES.UPLOAD));
		}
		finally {
			setIsUploading(false);
		}
	}

	// Файлы принимаем на всё поле, а не только на плитку. Перетаскивание тегов сюда не относится
	function handleDragOver(event: DragEvent<HTMLDivElement>) {
		if (!event.dataTransfer.types.includes('Files'))
			return;
		event.preventDefault();
		event.dataTransfer.dropEffect = isDisabled ? 'none' : 'copy';
		setIsDragOver(true);
	}

	function handleDragLeave(event: DragEvent<HTMLDivElement>) {
		// dragleave приходит и при переходе на дочерний элемент
		if (!event.currentTarget.contains(event.relatedTarget as Node | null))
			setIsDragOver(false);
	}

	function handleDrop(event: DragEvent<HTMLDivElement>) {
		if (!event.dataTransfer.types.includes('Files'))
			return;
		event.preventDefault();
		setIsDragOver(false);
		if (!isDisabled)
			uploadFiles(event.dataTransfer.files);
	}

	function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
		uploadFiles(event.target.files);
		event.target.value = '';
	}

	function getHint() {
		if (errorMessage)
			return errorMessage;
		if (!uploadKey)
			return emptyKeyHint;
		if (isUploading)
			return 'Загрузка...';
		return '';
	}

	const hint = getHint();

	return (
		<div
			className="gallery-field"
			onDragOver={ handleDragOver }
			onDragLeave={ handleDragLeave }
			onDrop={ handleDrop }
		>
			<SortableTags items={ items } onChange={ onChange } previewBaseUrl={ previewBaseUrl }>
				<label
					className={ `gallery-field__add${isDragOver && !isDisabled ? ' gallery-field__add--active' : ''}${isDisabled ? ' gallery-field__add--disabled' : ''}` }
					title={ uploadKey ? 'Перетащите изображения сюда или нажмите, чтобы выбрать' : emptyKeyHint }
				>
					<input
						className="gallery-field__input"
						type="file"
						accept="image/*"
						multiple
						disabled={ isDisabled }
						onChange={ handleFileInput }
					/>
					<img className="gallery-field__icon" src="/__spritemap#sprite-image-plus-view" alt="" />
				</label>
			</SortableTags>

			{ hint && <span className={ `gallery-field__hint${errorMessage ? ' gallery-field__hint--error' : ''}` }>{ hint }</span> }
		</div>
	);
}
