import type { ChangeEvent } from 'react';
import type { ArticleSection, ArticleSlide } from '@/components/visitor/Article/Article.types';

interface Props {
	slide: ArticleSlide;
	slideIndex: number;
	sectionIndex: number;
	article: ArticleSection[];
	onArticleChange: (newArticle: ArticleSection[]) => void;
}

export default function ArticleFormSlide({ slide, slideIndex, sectionIndex, article, onArticleChange }: Props) {
	const currentSection = article[sectionIndex];
	const { slides, content } = currentSection;
	const { filename, source, caption } = slide;

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
		<div className="form__row form__row-12 form__row-12--inline">
			{ `${slideIndex + 1}.` }
			<input className="input" value={ filename } name="filename" placeholder="название файла" onChange={ handleChange } />
			<input className="input" value={ source } name="source" placeholder="источник" onChange={ handleChange } />
			<input className="input" value={ caption } name="caption" placeholder="подпись" onChange={ handleChange } />
			<button type="button" className="checkbox-label checkbox-label--small" onClick={ handleDeleteSlide }>
				<img src="/__spritemap#sprite-times-view"></img>
			</button>
		</div>
	);
};
