import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import { useRef } from 'react';
import ArticleNavigation from '@/components/visitor/Article/ArticleNavigation';
import ArticleSection from '@/components/visitor/Article/ArticleSection';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import './Article.scss';

interface Props {
	seoTitle: string;
	title: string;
	subtitle?: string;
	data: Pick<IArticle, 'article'>;
}

export default function Article({ seoTitle, title, subtitle, data }: Props) {
	const articleRef = useRef<HTMLDivElement>(null);

	return (
		<div className="article" ref={ articleRef }>
			<Seo title={ seoTitle } />

			<PageTop title={ title } subtitle={ subtitle } />

			{ data.article?.map((section, i) => <ArticleSection key={ i } section={ section } />) }

			<div className="article-navigation-container">
				<ArticleNavigation containerRef={ articleRef } refreshKey={ data } />
			</div>
		</div>
	);
}
