import { useState } from 'react';
import ArticleBlock from '@/components/Article/ArticleBlock';
import { testArticle } from '@/components/Article/testData';
import PageTop from '@/components/PageTop/PageTop';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';

export default function Article() {
	const [showPreloader, _setShowPreloader] = useState<boolean>(false);

	return (
		<>
			<PageTop title="Керамика Микавати" />

			<Seo title="Камамото: статья на некоторую тему" description="Страница со статьёй на некоторую тему" />

			{ showPreloader
				? (
					<Preloader />
				)
				: (
					testArticle.map((block, i) => <ArticleBlock key={ i } block={ block } />)
				) }
		</>
	);
}
