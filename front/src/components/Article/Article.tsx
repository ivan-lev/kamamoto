import { useState } from 'react';
import ArticleBlock from '@/components/Article/ArticleBlock';
import { testArticle } from '@/components/Article/testData';
import PageTop from '@/components/PageTop/PageTop';
import Preloader from '@/components/Preloader/Preloader';
import Seo from '@/components/Seo/Seo';

export default function Collection() {
	const [showPreloader, _setShowPreloader] = useState<boolean>(false);

	return (
		<>
			<PageTop title="Статья на некоторую тему" />

			<Seo title="Камамото: статья на некоторую тему" description="Страница со статьёй на некоторую тему" />

			<section className="section">
				{ showPreloader
					? (
						<Preloader />
					)
					: (
						testArticle.map(block => <ArticleBlock block={ block } />)
					) }
			</section>
		</>
	);
}
