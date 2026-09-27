import type { ChangeEvent, DragEvent } from 'react';
import { useState } from 'react';
import '@/components/admin/shared/ImageDropzone/ImageDropzone.scss';

interface Props {
	previewSrc?: string;
	filename?: string;
	// MIME-типы, которые примет бэкенд для раздела
	mimeTypes: string[];
	hint?: string;
	onSelect: (file: File) => void;
	onRemove: () => void;
}

// Поле для одной картинки: файл перетаскивают или выбирают, а загружает его форма при сохранении
export default function ImageDropzone({ previewSrc, filename, mimeTypes, hint, onSelect, onRemove }: Props) {
	const [isDragOver, setIsDragOver] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const formats = mimeTypes.map(type => type.replace('image/', '').replace('jpeg', 'jpg')).join(', ');

	function selectFile(fileList: FileList | null) {
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
		<div className="form__row form__row-12 image-dropzone">
			<span>Картинка</span>

			<div className="image-dropzone__body">
				{ previewSrc
					? <img className="image-dropzone__preview" src={ previewSrc } alt={ filename } />
					: <span className="image-dropzone__preview" /> }

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
					{ hint || `Перетащите картинку (${formats}) сюда или нажмите, чтобы выбрать` }
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
