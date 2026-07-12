import type { ChangeEvent } from 'react';
import type { ArticleSection } from '@/components/visitor/Article/Article.types';
import { useEffect, useRef, useState } from 'react';
import ArticleFormSlide from '@/components/admin/shared/ArticleForm/ArticleFormSlide';

interface Props {
	section: ArticleSection;
	sectionIndex: number;
	article: ArticleSection[];
	onArticleChange: (newArticle: ArticleSection[]) => void;
}

export default function ArticleFormSection({ section, sectionIndex, article, onArticleChange }: Props) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);

	const { content, slides } = section;
	const [isArticleCollapsed, setIsArticleCollapsed] = useState(false);

	const initialSlide = { filename: '', source: '', caption: '' };

	const headingMatch = content.match(/<h[1-6]>(.*?)<\/h[1-6]>/);
	const heading = headingMatch?.[1];

	function updateSectionText(event: ChangeEvent<HTMLTextAreaElement>) {
		const { name, value } = event.target;
		const newArticleData = article.map((section, index) => index === sectionIndex ? { ...section, [name]: value } : section);
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

	function addSlideToSection() {
		const newSlidesData = slides?.length ? [...slides, Object.assign(initialSlide)] : [Object.assign(initialSlide)];
		const newSectionData = { content, slides: newSlidesData };
		const newArticleData = article.map((section, index) => index === sectionIndex ? newSectionData : section);
		onArticleChange(newArticleData);
	}

	function resizeTextArea() {
		const textarea = textareaRef.current;
		if (!textarea)
			return;

		const scrollY = window.scrollY;

		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight + 2}px`;

		window.scrollTo({ top: scrollY });
	}

	useEffect(() => {
		resizeTextArea();
	}, [content]);

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
				<textarea
					ref={ textareaRef }
					className="textarea"
					name="content"
					placeholder="текстовая информация"
					value={ content }
					onChange={ (event) => {
						updateSectionText(event);
						resizeTextArea();
					} }
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
					/>
				)) }
			</div>

			<div className="form__row form__row-3" style={{ display: isArticleCollapsed ? 'none' : 'flex' }}>
				<button type="button" className="button button--xs" onClick={ addSlideToSection }>Добавить слайд</button>
			</div>
		</div>
	);
};
