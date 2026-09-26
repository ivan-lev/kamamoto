import type { ChangeEvent, DragEvent } from 'react';
import type { SlidesStorage, UploadedSlide } from '@/components/visitor/Article/Article.types';
import { useState } from 'react';
import { api } from '@/utils/api/api';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/variables/variables';

interface Props {
	slidesStorage?: SlidesStorage;
	onUpload: (slides: UploadedSlide[]) => void;
}

export default function ArticleFormSlidesDropzone({ slidesStorage, onUpload }: Props) {
	const [isDragOver, setIsDragOver] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const isDisabled = !slidesStorage?.key || isUploading;

	function getHint() {
		if (!slidesStorage)
			return 'Загрузка файлов для этого раздела не настроена';
		if (!slidesStorage.key)
			return slidesStorage.emptyKeyHint;
		if (isUploading)
			return 'Загрузка...';
		return 'Перетащите изображения сюда или нажмите, чтобы выбрать';
	}

	async function uploadFiles(fileList: FileList | null) {
		const files = [...fileList ?? []].filter(file => file.type.startsWith('image/'));
		const token = storage.get<string>(STORAGE_KEYS.TOKEN);

		if (!slidesStorage?.key || !token || !files.length)
			return;

		setIsUploading(true);
		setErrorMessage('');

		try {
			const uploadedSlides = await api.uploads.uploadSlides(token, slidesStorage.target, slidesStorage.key, files);
			onUpload(uploadedSlides);
		}
		catch (error) {
			setErrorMessage(error instanceof Error ? error.message : 'Не удалось загрузить файлы');
		}
		finally {
			setIsUploading(false);
		}
	}

	function handleDragOver(event: DragEvent<HTMLLabelElement>) {
		event.preventDefault();
		if (!isDisabled)
			setIsDragOver(true);
	}

	function handleDrop(event: DragEvent<HTMLLabelElement>) {
		event.preventDefault();
		setIsDragOver(false);
		if (!isDisabled)
			uploadFiles(event.dataTransfer.files);
	}

	function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
		uploadFiles(event.target.files);
		event.target.value = '';
	}

	return (
		<div className="form__row form__row-12 slides-dropzone">
			<label
				className={ `slides-dropzone__area${isDragOver ? ' slides-dropzone__area--active' : ''}${isDisabled ? ' slides-dropzone__area--disabled' : ''}` }
				onDragOver={ handleDragOver }
				onDragLeave={ () => setIsDragOver(false) }
				onDrop={ handleDrop }
			>
				<input
					className="slides-dropzone__input"
					type="file"
					accept="image/*"
					multiple
					disabled={ isDisabled }
					onChange={ handleFileInput }
				/>
				{ getHint() }
			</label>

			{ errorMessage && <span className="slides-dropzone__error">{ errorMessage }</span> }
		</div>
	);
}
