import type { DragEvent } from 'react';
import type { SlideDragProps } from '@/components/admin/shared/ArticleForm/ArticleFormSlide';
import type { ArticleSection, ArticleSlide, SlidesStorage, UploadedSlide } from '@/components/visitor/Article/Article.types';
import { useEffect, useRef, useState } from 'react';
import ArticleFormSlide from '@/components/admin/shared/ArticleForm/ArticleFormSlide';
import ArticleFormSlidesDropzone from '@/components/admin/shared/ArticleForm/ArticleFormSlidesDropzone';
import RichTextEditor from '@/components/admin/shared/RichTextEditor/RichTextEditor';
import { PATHS } from '@/variables/variables';

// Собственный тип данных, чтобы перетаскиваемый слайд не приняли за файл (зона загрузки) или текст (редактор)
const SLIDE_DRAG_TYPE = 'application/x-article-slide';

interface Props {
	section: ArticleSection;
	sectionIndex: number;
	article: ArticleSection[];
	onArticleChange: (newArticle: ArticleSection[]) => void;
	slidesStorage?: SlidesStorage;
}

export default function ArticleFormSection({ section, sectionIndex, article, onArticleChange, slidesStorage }: Props) {
	const { content, slides } = section;
	const [isArticleCollapsed, setIsArticleCollapsed] = useState(false);
	const [draggedSlideIndex, setDraggedSlideIndex] = useState<number | null>(null);
	const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

	// Загрузка файлов асинхронная: пока она идёт, статью могут успеть поправить,
	// поэтому новые слайды добавляем к актуальной версии статьи
	const latestArticleRef = useRef(article);
	useEffect(() => {
		latestArticleRef.current = article;
	}, [article]);

	const slidesUrl = slidesStorage?.key ? `${PATHS.STATIC_URL}/${slidesStorage.target}/${slidesStorage.key}/slides` : undefined;

	const headingMatch = content.match(/<h[1-6]>(.*?)<\/h[1-6]>/);
	const heading = headingMatch?.[1];

	function updateSectionText(value: string) {
		const newArticleData = article.map((section, index) => index === sectionIndex ? { ...section, content: value } : section);
		onArticleChange(newArticleData);
	};

	function deleteSection() {
		const newArticleData = article.filter((_section, index) => index !== sectionIndex);
		onArticleChange(newArticleData);
	};

	function moveSection(direction: 'up' | 'down') {
		if (direction === 'up') {
			const newArticleData = article.toSpliced(sectionIndex - 1, 0, article[sectionIndex]).toSpliced(sectionIndex + 1, 1);
			onArticleChange(newArticleData);
		}

		if (direction === 'down') {
			const newArticleData = article.toSpliced(sectionIndex, 0, article[sectionIndex + 1]).toSpliced(sectionIndex + 2, 1);
			onArticleChange(newArticleData);
		}
	}

	function moveSlide(fromIndex: number, toIndex: number) {
		if (fromIndex === toIndex || !slides)
			return;

		const newSlides = slides.toSpliced(fromIndex, 1).toSpliced(toIndex, 0, slides[fromIndex]);
		const newArticleData = article.map((section, index) => index === sectionIndex ? { ...section, slides: newSlides } : section);
		onArticleChange(newArticleData);
	}

	function getSlideDragProps(slideIndex: number): SlideDragProps {
		const isDropTarget = draggedSlideIndex !== null && dropTargetIndex === slideIndex && draggedSlideIndex !== slideIndex;

		return {
			isDragged: draggedSlideIndex === slideIndex,
			// слайд встанет на место целевого: при движении вниз — после него, вверх — перед ним
			dropPosition: isDropTarget ? (draggedSlideIndex < slideIndex ? 'after' : 'before') : undefined,

			onDragStart: (event: DragEvent<HTMLElement>) => {
				event.dataTransfer.effectAllowed = 'move';
				event.dataTransfer.setData(SLIDE_DRAG_TYPE, String(slideIndex));
				const row = event.currentTarget.closest('.slide-row');
				if (row)
					event.dataTransfer.setDragImage(row, 0, 0);
				setDraggedSlideIndex(slideIndex);
			},

			// слайды других секций и файлы сюда не принимаем
			onDragOver: (event: DragEvent<HTMLElement>) => {
				if (draggedSlideIndex === null || !event.dataTransfer.types.includes(SLIDE_DRAG_TYPE))
					return;
				event.preventDefault();
				event.dataTransfer.dropEffect = 'move';
				setDropTargetIndex(slideIndex);
			},

			onDrop: (event: DragEvent<HTMLElement>) => {
				if (draggedSlideIndex === null)
					return;
				event.preventDefault();
				moveSlide(draggedSlideIndex, slideIndex);
				setDraggedSlideIndex(null);
				setDropTargetIndex(null);
			},

			onDragEnd: () => {
				setDraggedSlideIndex(null);
				setDropTargetIndex(null);
			},
		};
	}

	function addUploadedSlides(uploadedSlides: UploadedSlide[]) {
		const newSlides: ArticleSlide[] = uploadedSlides.map(({ filename }) => ({ filename, source: '', caption: '' }));
		const newArticleData = latestArticleRef.current.map((section, index) => index === sectionIndex
			? { ...section, slides: [...section.slides ?? [], ...newSlides] }
			: section);
		onArticleChange(newArticleData);
	}

	return (
		<div className="form__grid container" style={{ padding: 'var(--gap-24)' }}>
			<div className="form__row form__row-6">
				<span>
					{ `Секция ${sectionIndex + 1}${heading ? `: ${heading}` : ''}` }
				</span>
			</div>

			<div className="form__row form__row-6 form__row-12--inline">
				{ sectionIndex !== 0 && (
					<button type="button" className="checkbox-label checkbox-label--small" onClick={ () => moveSection('up') }>
						<img src="/__spritemap#sprite-arrow-turn-up-view"></img>
					</button>
				) }

				{ sectionIndex !== article.length - 1 && (
					<button type="button" className="checkbox-label checkbox-label--small" onClick={ () => moveSection('down') }>
						<img src="/__spritemap#sprite-arrow-turn-down-view"></img>
					</button>
				) }

				<button type="button" className="checkbox-label checkbox-label--small" onClick={ deleteSection }>
					<img src="/__spritemap#sprite-times-view"></img>
				</button>

				<button type="button" className="button button--xs" onClick={ () => { setIsArticleCollapsed(!isArticleCollapsed); } }>
					{ isArticleCollapsed ? 'развернуть' : 'Свернуть' }
				</button>
			</div>

			<div className="form__row form__row-12" style={{ display: isArticleCollapsed ? 'none' : 'flex' }}>
				<RichTextEditor
					value={ content }
					placeholder="текстовая информация"
					onChange={ updateSectionText }
				/>
			</div>

			<div className="form__row form__row-12" style={{ display: isArticleCollapsed ? 'none' : 'flex' }}>
				<span>
					{ `слайды к секции ${sectionIndex + 1}` }
				</span>
			</div>

			<div className="form__row form__row-12" style={{ display: isArticleCollapsed ? 'none' : 'flex' }}>
				{ slides?.map((slide, index) => (
					<ArticleFormSlide
						key={ sectionIndex + index.toString() }
						slide={ slide }
						slideIndex={ index }
						sectionIndex={ sectionIndex }
						article={ article }
						onArticleChange={ onArticleChange }
						slidesUrl={ slidesUrl }
						drag={ getSlideDragProps(index) }
					/>
				)) }
			</div>

			{ !isArticleCollapsed && (
				<ArticleFormSlidesDropzone
					slidesStorage={ slidesStorage }
					onUpload={ addUploadedSlides }
				/>
			) }
		</div>
	);
};
