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

	useEffect(() => {
		if (!potter)
			return;

		api.potters.getPotterById(potter)
			.then(setPotterInfo)
			.catch((error: any) => {
				if (error.status === 404) {
					navigate('/404', { replace: true });
				}
			});
	}, [potter, navigate]);

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
