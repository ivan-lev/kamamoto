import type { ChangeEvent } from 'react';
import type { ArticleSection } from '@/components/admin/CeramicStyles/ceramicStyles.types';
import type { RootState } from '@/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import CeramicStyleArticleSlide from '@/components/admin/CeramicStyles/CeramicStyleArticleSlide';
import { setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';

interface Props {
	section: ArticleSection;
	sectionIndex: number;
}

export default function CeramicStyleArticleSection({ section, sectionIndex }: Props) {
	const dispatch = useDispatch();
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);
	const { article } = ceramicStyleToEdit;
	const currentSection = article[sectionIndex];
	const { content, slides } = currentSection;

	const initialSlide = { filename: '', source: '', caption: '' };

	function updateSectionText(event: ChangeEvent<HTMLTextAreaElement>) {
		const { name, value } = event.target;
		const newArticleData = article?.map((section, index) => index === sectionIndex ? { ...section, [name]: value } : section);
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: newArticleData }));
	};

	function deleteSection() {
		const newArticleData = article.filter((_section, index) => index !== sectionIndex);
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: newArticleData }));
	};

	function addSlideToSection() {
		const newSlidesData = slides?.length ? [...slides, Object.assign(initialSlide)] : [Object.assign(initialSlide)];
		const newSectionData = { content, slides: newSlidesData };
		const newArticleData = article?.map((section, index) => index === sectionIndex ? newSectionData : section);
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: newArticleData }));
	}

	return (
		<div style={{ gridColumn: '1 / -1' }} className="form__grid">
			<div className="form__row form__row-3">
				<span>
					{ `секция ${sectionIndex + 1}` }
				</span>
			</div>

			<div className="form__row form__row-3">
				<button type="button" className="checkbox-label checkbox-label--small" onClick={ deleteSection }>
					<img src="/__spritemap#sprite-times-view"></img>
				</button>
			</div>

			<div className="form__row form__row-12">
				<textarea
					className="textarea"
					name="content"
					placeholder="текстовая информация"
					value={ section.content }
					onChange={ event => updateSectionText(event) }
				/>
			</div>

			<div className="form__row form__row-12">
				<span>
					{ `слайды к секции ${sectionIndex + 1}` }
				</span>
			</div>

			{ slides?.map((slide, index) => <CeramicStyleArticleSlide key={ sectionIndex + index.toString() } slide={ slide } slideIndex={ index } sectionIndex={ sectionIndex } />) }

			<div className="form__row form__row-3">
				<button type="button" className="button button--xs" onClick={ addSlideToSection }>Добавить слайд</button>
			</div>
		</div>
	);
};
