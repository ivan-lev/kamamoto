import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ArticleSection from '@/components/visitor/Article/ArticleSection';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';

import { api } from '@/utils/api/api';

export default function Article() {
	const { style } = useParams();
	const [articleInfo, setArticleInfo] = useState<IArticle | null>(null);
	const [error, setError] = useState(false);

	async function getCeramicStylesInfo(style: string) {
		if (!style)
			return;

		try {
			const data = await api.ceramicStyles.getCeramicStylesArticle(style);
			setArticleInfo(data);
		}
		catch (error) {
			console.error(error);
			setError(true);
		}
	}

	useEffect(() => {
		if (!style)
			return;
		getCeramicStylesInfo(style);
	}, [style]);

	if (error) {
		return <div>Статья не найдена</div>;
	}

	if (!articleInfo) {
		return <Preloader />;
	}

	return (
		<>
			<PageTop title={ `Керамика ${articleInfo.title}` } subtitle="" />

			<Seo title={ `Камамото: керамика ${articleInfo.title}` } description={ `Страница со статьёй о керамике ${articleInfo.title}` } />

			{ articleInfo.article?.map((section, i) => <ArticleSection key={ i } section={ section } />) }
		</>
	);
}
