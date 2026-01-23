import type { ChangeEvent } from 'react';
import type { RootState } from '@/slices/admin';
import { useDispatch, useSelector } from 'react-redux';
import CeramicStyleArticleSection from '@/components/admin/CeramicStyles/CeramicStyleArticleSection';
import { setCeramicStyleToEdit } from '@/slices/admin/ceramicStyles';

export default function CeramicStylesFormArticle() {
	const dispatch = useDispatch();
	const ceramicStyleToEdit = useSelector((state: RootState) => state.ceramicStyles.ceramicStyleToEdit);
	const { article, showArticle } = ceramicStyleToEdit;

	function handleCheckBox(event: ChangeEvent<HTMLInputElement>) {
		const { name, checked } = event.target;
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, [name]: checked }));
	};

	function addArticleSection() {
		dispatch(setCeramicStyleToEdit({ ...ceramicStyleToEdit, article: article ? [...article, { content: '', slides: [] }] : [{ content: '', slides: [] }] }));
	}

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Секции статьи</legend>

			<div className="form__grid">

				{ article?.map((section, index) => <CeramicStyleArticleSection key={ index } section={ section } sectionIndex={ index } />) }

				<div className="form__row form__row-12 form__row-12--inline">
					<button className="button" type="button" onClick={ addArticleSection }>Добавить секцию</button>

					<span>Показать статью</span>
					<label
						className={ `checkbox-label ${
							showArticle ? 'checkbox-label--checked' : ''
						} ` }
					>
						<input
							className="checkbox-input"
							type="checkbox"
							checked={ showArticle }
							name="showArticle"
							onChange={ handleCheckBox }
						/>
					</label>

				</div>
			</div>
		</fieldset>

	);
}
