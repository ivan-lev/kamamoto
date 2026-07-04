import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import ArticleSection from '@/components/visitor/Article/ArticleSection';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';

export default function Article() {
	const { style } = useParams();
	const [articleInfo, setArticleInfo] = useState<IArticle | null>(null);
	const navigate = useNavigate();

	async function getCeramicStylesInfo(style: string) {
		if (!style)
			return;

		try {
			const data = await api.ceramicStyles.getCeramicStylesArticle(style);
			setArticleInfo(data);
		}
		catch (error: any) {
			if (error.status === 404) {
				navigate('/404', { replace: true });
			}
		}
	}

	useEffect(() => {
		if (!style)
			return;
		getCeramicStylesInfo(style);
	}, [style]);

	useLayoutEffect(() => scrollToTop(), []);

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
