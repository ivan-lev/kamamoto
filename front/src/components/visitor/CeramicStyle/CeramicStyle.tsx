import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import Article from '@/components/visitor/Article/Article';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';

export default function CeremicStyle() {
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
		<Article
			seoTitle={ `Камамото: керамика ${articleInfo.title}` }
			seoDescription={ `Страница со статьёй о керамике ${articleInfo.title}` }
			title={ `Керамика ${articleInfo.title}` }
			subtitle=""
			data={ articleInfo }
		/>
	);
}
