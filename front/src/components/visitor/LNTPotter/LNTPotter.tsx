import type { Article as IArticle } from '@/components/visitor/Article/Article.types';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import Article from '@/components/visitor/Article/Article';
import { api } from '@/utils/api/api';
import { scrollToTop } from '@/utils/scrollToTop';

export default function LNTPotter() {
	const { potter } = useParams();
	const [potterInfo, setPotterInfo] = useState<IArticle | null>(null);
	const navigate = useNavigate();

	async function getPotterInfo(potter: string) {
		if (!potter)
			return;

		try {
			const data = await api.potters.getPotterById(potter);
			setPotterInfo(data);
		}
		catch (error: any) {
			if (error.status === 404) {
				navigate('/404', { replace: true });
			}
		}
	}

	useEffect(() => {
		if (!potter)
			return;
		getPotterInfo(potter);
	}, [potter]);

	useLayoutEffect(() => scrollToTop(), []);

	if (!potterInfo) {
		return <Preloader />;
	}

	return (
		<Article
			seoTitle={ `Камамото: гончар ${potterInfo.name}` }
			seoDescription={ `Страница со статьёй о гончаре ${potterInfo.name}` }
			title={ potterInfo.name }
			data={ potterInfo }
		/>
	);
}
