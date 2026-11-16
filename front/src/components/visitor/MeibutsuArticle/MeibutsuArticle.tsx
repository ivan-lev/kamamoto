import type { Meibutsu } from '@/types/meibutsu';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import Preloader from '@/components/shared/Preloader/Preloader';
import Article from '@/components/visitor/Article/Article';
import NotFound from '@/components/visitor/NotFound/NotFound';
import { api } from '@/utils/api/api';
import { isPageMissing } from '@/utils/api/api.common';
import { scrollToTop } from '@/utils/scrollToTop';

export default function MeibutsuArticle() {
	const { id } = useParams();
	const [meibutsuInfo, setMeibutsuInfo] = useState<Meibutsu | null>(null);
	// адрес, по которому записи не оказалось: при переходе на другой адрес страница снова грузится
	const [missingMeibutsu, setMissingMeibutsu] = useState<string>();

	useEffect(() => {
		if (!id)
			return;

		async function fetchMeibutsu(meibutsuId: string) {
			try {
				setMeibutsuInfo(await api.meibutsu.getMeibutsuArticle(meibutsuId));
			}
			catch (error) {
				if (isPageMissing(error))
					setMissingMeibutsu(meibutsuId);
			}
		}

		fetchMeibutsu(id);
	}, [id]);

	useLayoutEffect(() => scrollToTop(), []);

	if (missingMeibutsu === id) {
		return <NotFound />;
	}

	if (!meibutsuInfo) {
		return <Preloader />;
	}

	return (
		<Article
			seoTitle={ `Камамото: вещь с именем ${meibutsuInfo.name}` }
			title={ meibutsuInfo.name }
			subtitle={ meibutsuInfo.japaneseName }
			data={ meibutsuInfo }
		/>
	);
}
