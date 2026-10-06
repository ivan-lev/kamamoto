import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import Article from '@/components/visitor/Article/Article';
import NotFound from '@/components/visitor/NotFound/NotFound';
import { api } from '@/utils/api/api';
import { isPageMissing } from '@/utils/api/api.common';
import { scrollToTop } from '@/utils/scrollToTop';

export default function CeremicStyle() {
	const { style } = useParams();
	const [articleInfo, setArticleInfo] = useState<IArticle | null>(null);
	// адрес, по которому записи не оказалось: при переходе на другой адрес страница снова грузится
	const [missingStyle, setMissingStyle] = useState<string>();

	useEffect(() => {
		if (!style)
			return;

		async function fetchArticle(name: string) {
			try {
				setArticleInfo(await api.ceramicStyles.getCeramicStylesArticle(name));
			}
			catch (error) {
				if (isPageMissing(error))
					setMissingStyle(name);
			}
		}

		fetchArticle(style);
	}, [style]);

	useLayoutEffect(() => scrollToTop(), []);

	if (missingStyle === style) {
		return <NotFound />;
	}

	if (!articleInfo) {
		return <Preloader />;
	}

	return (
		<Article
			seoTitle={ `Камамото: керамика ${articleInfo.title}` }
			title={ `Керамика ${articleInfo.title}` }
			subtitle=""
			data={ articleInfo }
		/>
	);
}
