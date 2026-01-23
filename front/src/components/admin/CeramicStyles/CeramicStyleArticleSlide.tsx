import type { ChangeEvent } from 'react';
import type { ArticleSlide } from '@/components/admin/CeramicStyles/ceramicStyles.types';
import type { RootState } from '@/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import { setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';

interface Props {
	slide: ArticleSlide;
	slideIndex: number;
	sectionIndex: number;
}

export default function CeramicStyleArticleSlide({ slide, slideIndex, sectionIndex }: Props) {
	const dispatch = useDispatch();
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);
	const { article } = ceramicStyleToEdit;
	const currentSection = article[sectionIndex];
	const { slides, content } = currentSection;
	const { filename, source, caption } = slide;

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		const newSlidesData = slides?.map((slide, index) => index !== slideIndex ? slide : { ...slide, [name]: value });
		const newSectionData = { content, slides: newSlidesData };
		const newArticleData = article.map((section, index) => index !== sectionIndex ? section : newSectionData);
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: newArticleData }));
	}

	function handleDeleteSlide() {
		const newSlidesData = slides?.filter((_slide, index) => index !== slideIndex);
		const newSectionData = { content, slides: newSlidesData || [] };
		const newArticleData = article.map((section, index) => index !== sectionIndex ? section : newSectionData);
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: newArticleData }));
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
