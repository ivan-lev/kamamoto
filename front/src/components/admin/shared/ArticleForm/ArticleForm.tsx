import type { ChangeEvent } from 'react';
import type { ArticleSection } from '@/components/visitor/Article/Article.types';
import ArticleFormSection from '@/components/admin/shared/ArticleForm/ArticleFormSection';

export interface ArticleEntity {
	article: ArticleSection[];
	showArticle: boolean;
}

interface Props<T extends ArticleEntity> {
	entity: T;
	onChange: (updatedEntity: T) => void;
}

export default function ArticleForm<T extends ArticleEntity>({ entity, onChange }: Props<T>) {
	const { article, showArticle } = entity;

	function updateArticle(newArticle: ArticleSection[]) {
		onChange({ ...entity, article: newArticle });
	}

	function handleCheckBox(event: ChangeEvent<HTMLInputElement>) {
		const { checked } = event.target;
		onChange({ ...entity, showArticle: checked });
	}

	function addArticleSection() {
		updateArticle(article ? [...article, { content: '', slides: [] }] : [{ content: '', slides: [] }]);
	}

	return (
		<fieldset className="form__fieldset">
			<legend className="form__legend">Секции статьи</legend>

			{ article?.map((section, index) => (
				<ArticleFormSection
					key={ index }
					section={ section }
					sectionIndex={ index }
					article={ article }
					onArticleChange={ updateArticle }
				/>
			)) }

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
		</fieldset>

	);
}
