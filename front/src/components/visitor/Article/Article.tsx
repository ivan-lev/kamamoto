import type { CeramicStyle } from '@/types/ceramicStyles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ArticleSection from '@/components/visitor/Article/ArticleSection';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';

import { api } from '@/utils/api/api';

export default function Article() {
	const { style } = useParams();
	const [showPreloader, _setShowPreloader] = useState<boolean>(false);
	const [articleInfo, setArticleInfo] = useState<CeramicStyle>();

	async function getCeramicStylesInfo(style: string) {
		try {
			const data = await api.ceramicStyles.getCeramicStylesArticle(style);
			setArticleInfo(data);
		}
		catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (style) {
			getCeramicStylesInfo(style);
		}
	}, [style]);

	return (
		<>
			{ articleInfo?.title && <PageTop title={ `Керамика ${articleInfo?.title}` } subtitle="" /> }

			<Seo title={ `Камамото: керамика ${articleInfo?.title}` } description={ `Страница со статьёй о керамике ${articleInfo?.title}` } />

			{ showPreloader
				? <Preloader />
				: articleInfo?.article?.map((section, i) => <ArticleSection key={ i } section={ section } />) }
		</>
	);
}
