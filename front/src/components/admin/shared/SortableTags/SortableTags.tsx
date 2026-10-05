import type { DragEvent, ReactNode } from 'react';
import { useState } from 'react';
import Tag from '@/components/visitor/Tag/Tag';
import '@/components/admin/shared/SortableTags/SortableTags.scss';

// Собственный тип данных, чтобы тег не приняли за текст и не вставили в соседний инпут
const TAG_DRAG_TYPE = 'application/x-sortable-tag';

interface Props {
	items: string[];
	onChange: (items: string[]) => void;
	// папка с файлами: если задана, над тегом показывается превью `${previewBaseUrl}/${item}`
	previewBaseUrl?: string;
	// дополнительный элемент в конце списка (плитка загрузки)
	children?: ReactNode;
}

// Список тегов, которые можно переставлять перетаскиванием и удалять крестиком
export default function SortableTags({ items, onChange, previewBaseUrl, children }: Props) {
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
	// адреса, по которым картинка не загрузилась: имя файла с опечаткой или файла нет на сервере
	const [missingPreviews, setMissingPreviews] = useState<string[]>([]);

	function moveItem(fromIndex: number, toIndex: number) {
		if (fromIndex === toIndex)
			return;

		onChange(items.toSpliced(fromIndex, 1).toSpliced(toIndex, 0, items[fromIndex]));
	}

	function resetDrag() {
		setDraggedIndex(null);
		setDropTargetIndex(null);
	}

	function handleDragStart(event: DragEvent<HTMLElement>, index: number) {
		event.dataTransfer.effectAllowed = 'move';
		event.dataTransfer.setData(TAG_DRAG_TYPE, String(index));
		setDraggedIndex(index);
	}

	// теги из другого списка сюда не принимаем: у этого списка draggedIndex пустой
	function handleDragOver(event: DragEvent<HTMLElement>, index: number) {
		if (draggedIndex === null || !event.dataTransfer.types.includes(TAG_DRAG_TYPE))
			return;
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
		setDropTargetIndex(index);
	}

	function handleDrop(event: DragEvent<HTMLElement>, index: number) {
		if (draggedIndex === null)
			return;
		event.preventDefault();
		moveItem(draggedIndex, index);
		resetDrag();
	}

	function getModifiers(index: number) {
		const classNames = ['sortable-tags__item'];
		if (draggedIndex === index)
			classNames.push('sortable-tags__item--dragged');

		// тег встанет на место целевого: при движении вперёд — после него, назад — перед ним
		if (draggedIndex !== null && dropTargetIndex === index && draggedIndex !== index)
			classNames.push(`sortable-tags__item--drop-${draggedIndex < index ? 'after' : 'before'}`);

		return classNames.join(' ');
	}

	function renderPreview(item: string) {
		if (!previewBaseUrl)
			return null;

		const src = `${previewBaseUrl}/${item}`;
		if (missingPreviews.includes(src))
			return <div className="sortable-tags__preview sortable-tags__preview--missing">нет файла</div>;

		return (
			<img
				className="sortable-tags__preview"
				src={ src }
				alt={ item }
				loading="lazy"
				// иначе браузер потащит саму картинку, а не тег
				draggable={ false }
				onError={ () => setMissingPreviews(previews => [...previews, src]) }
			/>
		);
	}

	return (
		<div className="sortable-tags">
			{ items.map((item, index) => (
				<div
					key={ item }
					className={ getModifiers(index) }
					title="Перетащите, чтобы изменить порядок"
					draggable
					onDragStart={ event => handleDragStart(event, index) }
					onDragOver={ event => handleDragOver(event, index) }
					onDrop={ event => handleDrop(event, index) }
					onDragEnd={ resetDrag }
				>
					{ renderPreview(item) }
					<Tag title={ item } action={ () => onChange(items.filter(other => other !== item)) } />
				</div>
			)) }
			{ children }
		</div>
	);
}
