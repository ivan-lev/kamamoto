import type { ChangeEvent } from 'react';
import type { ArticleSection } from '@/components/admin/CeramicStyles/ceramicStyles.types';
import type { RootState } from '@/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import { setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';

interface Props {
	section: ArticleSection;
	sectionNumber: number;
}

export default function CeramicStyleArticleSection({ section, sectionNumber }: Props) {
	const dispatch = useDispatch();
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);
	const { article } = ceramicStyleToEdit;
	const currentSection = article[sectionNumber];
	const { content, slides } = currentSection;

	const initialSlide = { url: '', source: '', caption: '' };

	function updateArticleSectionText(event: ChangeEvent<HTMLTextAreaElement>) {
		const { name, value } = event.target;
		const newArticleData = article?.map((section, index) => index === sectionNumber ? { ...section, [name]: value } : section);
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: newArticleData }));
	};

	function addSlideToSection() {
		const newSlidesData = slides?.length ? [...slides, Object.assign(initialSlide)] : [Object.assign(initialSlide)];
		const newSectionData = { content, slides: newSlidesData };
		const newArticleData = article?.map((section, index) => index === sectionNumber ? newSectionData : section);
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: newArticleData }));
	}

	return (
		<div>
			<div className="form__row form__row-12">
				<span>
					{ `секция ${sectionNumber + 1}` }
				</span>
				<textarea
					className="textarea"
					name="content"
					placeholder="текстовая информация"
					value={ section.content }
					onChange={ event => updateArticleSectionText(event) }
				/>
			</div>

			{ slides?.map(slide => <span>{ slide.caption }</span>) }

			<div className="form__row form__row-12">
				<span>
					{ `слайды к секции ${sectionNumber + 1}` }
				</span>
			</div>
			<button type="button" className="button button--xs" onClick={ addSlideToSection }>Добавить слайд</button>
		</div>
	);
};
