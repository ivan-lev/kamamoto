import type { ArticleSection } from '@/components/visitor/Article/Article.types';
import ArticleFormSection from '@/components/admin/shared/ArticleForm/ArticleFormSection';

export interface ArticleEntity {
	article: ArticleSection[];
}

interface Props<T extends ArticleEntity> {
	entity: T;
	onChange: (updatedEntity: T) => void;
}

export default function ArticleForm<T extends ArticleEntity>({ entity, onChange }: Props<T>) {
	const { article } = entity;

	function updateArticle(newArticle: ArticleSection[]) {
		onChange({ ...entity, article: newArticle });
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

			<button className="button" style={{ margin: 'auto' }} type="button" onClick={ addArticleSection }>Добавить секцию</button>
		</fieldset>

	);
}
