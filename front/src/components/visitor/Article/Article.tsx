import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import ArticleSection from '@/components/visitor/Article/ArticleSection';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';

interface Props {
	seoTitle: string;
	title: string;
	subtitle?: string;
	data: Pick<IArticle, 'article'>;
}

export default function Article({ seoTitle, title, subtitle, data }: Props) {
	return (
		<>
			<Seo title={ seoTitle } />

			<PageTop title={ title } subtitle={ subtitle } />

			{ data.article?.map((section, i) => <ArticleSection key={ i } section={ section } />) }
		</>
	);
}
