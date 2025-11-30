import { useState } from 'react';
import ArticleBlock from '@/components/visitor/Article/ArticleBlock';
import { testArticle } from '@/components/visitor/Article/testData';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Preloader from '@/components/visitor/Preloader/Preloader';
import Seo from '@/components/visitor/Seo/Seo';

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
