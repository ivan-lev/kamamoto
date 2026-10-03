import type { ChangeEvent, DragEvent } from 'react';
import { useState } from 'react';
import '@/components/admin/shared/ImageDropzone/ImageDropzone.scss';

// Выбранная, но ещё не загруженная картинка
export interface PendingImage {
	file: File;
	previewUrl: string;
}

interface Props {
	label?: string;
	// ширина в сетке формы
	rowClassName?: string;
	// contain — показать картинку целиком (например, карту), а не обрезать
	previewFit?: 'cover' | 'contain';
	previewSrc?: string;
	filename?: string;
	// MIME-типы, которые примет бэкенд для раздела
	mimeTypes: string[];
	// точный размер в пикселях, если картинка должна быть именно такой (например, og 1200 × 630)
	size?: { width: number, height: number };
	hint?: string;
	onSelect: (file: File) => void;
	onRemove: () => void;
}

// Поле для одной картинки: файл перетаскивают или выбирают, а загружает его форма при сохранении
export default function ImageDropzone({ label = 'Картинка', rowClassName = 'form__row-12', previewFit = 'cover', previewSrc, filename, mimeTypes, size, hint, onSelect, onRemove }: Props) {
	const [isDragOver, setIsDragOver] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const formats = mimeTypes.map(type => type.replace('image/', '').replace('jpeg', 'jpg').replace('+xml', '')).join(', ');
	const sizeText = size && `${size.width} × ${size.height}`;
	const previewClassName = `image-dropzone__preview${previewFit === 'contain' ? ' image-dropzone__preview--contain' : ''}`;

	// Размер узнаём у браузера: он декодирует картинку сам, без библиотек
	async function getSizeError(file: File) {
		if (!size)
			return '';

		try {
			const bitmap = await createImageBitmap(file);
			const { width, height } = bitmap;
			bitmap.close();
			return width === size.width && height === size.height
				? ''
				: `Нужна картинка ${sizeText}, а у этой ${width} × ${height}`;
		}
		catch {
			return 'Не удалось прочитать картинку';
		}
	}

	async function selectFile(fileList: FileList | null) {
		const files = [...fileList ?? []];
		if (!files.length)
			return;

		if (files.length > 1) {
			setErrorMessage('Можно выбрать только одну картинку');
			return;
		}

		if (!mimeTypes.includes(files[0].type)) {
			setErrorMessage(`Подходят только картинки ${formats}`);
			return;
		}

		const sizeError = await getSizeError(files[0]);
		if (sizeError) {
			setErrorMessage(sizeError);
			return;
		}

		setErrorMessage('');
		onSelect(files[0]);
	}

	function handleDragOver(event: DragEvent<HTMLLabelElement>) {
		if (!event.dataTransfer.types.includes('Files'))
			return;
		event.preventDefault();
		setIsDragOver(true);
	}

	function handleDrop(event: DragEvent<HTMLLabelElement>) {
		if (!event.dataTransfer.types.includes('Files'))
			return;
		event.preventDefault();
		setIsDragOver(false);
		selectFile(event.dataTransfer.files);
	}

	function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
		selectFile(event.target.files);
		event.target.value = '';
	}

	return (
		<div className={ `form__row ${rowClassName} image-dropzone` }>
			<span>{ label }</span>

			<div className="image-dropzone__body">
				{ previewSrc
					? <img className={ previewClassName } src={ previewSrc } alt={ filename } />
					: <span className={ previewClassName } /> }

				<label
					className={ `slides-dropzone__area${isDragOver ? ' slides-dropzone__area--active' : ''}` }
					onDragOver={ handleDragOver }
					onDragLeave={ () => setIsDragOver(false) }
					onDrop={ handleDrop }
				>
					<input
						className="slides-dropzone__input"
						type="file"
						accept={ mimeTypes.join(',') }
						onChange={ handleFileInput }
					/>
					{ hint || `Перетащите картинку (${formats}${sizeText ? `, ${sizeText}` : ''}) сюда или нажмите, чтобы выбрать` }
				</label>
			</div>

			{ filename && (
				<div className="image-dropzone__file">
					<input className="input input_readonly" value={ filename } title={ filename } readOnly />
					<button type="button" className="checkbox-label checkbox-label--small" title="Убрать картинку" onClick={ onRemove }>
						<img src="/__spritemap#sprite-times-view"></img>
					</button>
				</div>
			) }

			{ errorMessage && <span className="slides-dropzone__error">{ errorMessage }</span> }
		</div>
	);
}
