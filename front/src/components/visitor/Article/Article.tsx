import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import ArticleSection from '@/components/visitor/Article/ArticleSection';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';

interface Props {
	seoTitle: string;
	seoDescription: string;
	title: string;
	subtitle?: string;
	data: IArticle;
}

export default function Article({ seoTitle, seoDescription, title, subtitle, data }: Props) {
	return (
		<>
			<Seo title={ seoTitle } description={ seoDescription } />

			<PageTop title={ title } subtitle={ subtitle } />

			{ data.article?.map((section, i) => <ArticleSection key={ i } section={ section } />) }
		</>
	);
}
