import type { ChangeEvent, DragEvent } from 'react';
import type { ArticleSection, ArticleSlide } from '@/components/visitor/Article/Article.types';

export interface SlideDragProps {
	isDragged: boolean;
	dropPosition?: 'before' | 'after';
	onDragStart: (event: DragEvent<HTMLElement>) => void;
	onDragOver: (event: DragEvent<HTMLElement>) => void;
	onDrop: (event: DragEvent<HTMLElement>) => void;
	onDragEnd: () => void;
}

interface Props {
	slide: ArticleSlide;
	slideIndex: number;
	sectionIndex: number;
	article: ArticleSection[];
	onArticleChange: (newArticle: ArticleSection[]) => void;
	slidesUrl?: string;
	drag: SlideDragProps;
}

export default function ArticleFormSlide({ slide, slideIndex, sectionIndex, article, onArticleChange, slidesUrl, drag }: Props) {
	const currentSection = article[sectionIndex];
	const { slides, content } = currentSection;
	const { filename, source, caption } = slide;

	const previewSrc = filename.startsWith('http')
		? filename
		: filename && slidesUrl ? `${slidesUrl}/${filename}` : undefined;

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		const newSlidesData = slides?.map((slide, index) => index !== slideIndex ? slide : { ...slide, [name]: value });
		const newSectionData = { content, slides: newSlidesData };
		const newArticleData = article.map((section, index) => index !== sectionIndex ? section : newSectionData);
		onArticleChange(newArticleData);
	}

	function handleDeleteSlide() {
		const newSlidesData = slides?.filter((_slide, index) => index !== slideIndex);
		const newSectionData = { content, slides: newSlidesData || [] };
		const newArticleData = article.map((section, index) => index !== sectionIndex ? section : newSectionData);
		onArticleChange(newArticleData);
	}

	return (
		<div
			className={ `form__row form__row-12 form__row-12--inline slide-row${drag.isDragged ? ' slide-row--dragged' : ''}${drag.dropPosition ? ` slide-row--drop-${drag.dropPosition}` : ''}` }
			onDragOver={ drag.onDragOver }
			onDrop={ drag.onDrop }
		>
			<span
				className="slide-row__handle"
				title="Перетащите, чтобы изменить порядок"
				draggable
				onDragStart={ drag.onDragStart }
				onDragEnd={ drag.onDragEnd }
			>
				⠿
			</span>
			{ /* { `${slideIndex + 1}.` } */ }
			{ previewSrc
				? <img className="slides-dropzone__preview" src={ previewSrc } alt={ filename } />
				: <span className="slides-dropzone__preview" /> }
			<input className="input input_readonly" value={ filename } name="filename" placeholder="название файла" title={ filename } readOnly />
			<input className="input" value={ source } name="source" placeholder="источник" onChange={ handleChange } />
			<input className="input" value={ caption } name="caption" placeholder="подпись" onChange={ handleChange } />
			<button type="button" className="checkbox-label checkbox-label--small" onClick={ handleDeleteSlide }>
				<img src="/__spritemap#sprite-times-view"></img>
			</button>
		</div>
	);
};
