import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import Article from '@/components/visitor/Article/Article';
import NotFound from '@/components/visitor/NotFound/NotFound';
import { api } from '@/utils/api/api';
import { isPageMissing } from '@/utils/api/api.common';
import { scrollToTop } from '@/utils/scrollToTop';

export default function LNTPotter() {
	const { potter } = useParams();
	const [potterInfo, setPotterInfo] = useState<IArticle | null>(null);
	// адрес, по которому записи не оказалось: при переходе на другой адрес страница снова грузится
	const [missingPotter, setMissingPotter] = useState<string>();

	useEffect(() => {
		if (!potter)
			return;

		async function fetchPotter(id: string) {
			try {
				setPotterInfo(await api.potters.getPotterById(id));
			}
			catch (error) {
				if (isPageMissing(error))
					setMissingPotter(id);
			}
		}

		fetchPotter(potter);
	}, [potter]);

	useLayoutEffect(() => scrollToTop(), []);

	if (missingPotter === potter) {
		return <NotFound />;
	}

	if (!potterInfo) {
		return <Preloader />;
	}

	return (
		<Article
			seoTitle={ `Камамото: гончар ${potterInfo.name}` }
			title={ potterInfo.name }
			data={ potterInfo }
		/>
	);
}
