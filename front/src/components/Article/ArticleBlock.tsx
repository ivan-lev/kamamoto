import type { IArticleBlock } from '@/components/Article/Article.types';
import ArticleSlider from '@/components/Article/ArticleSlider/ArticleSlider';

interface Props {
	block: IArticleBlock;
}

export default function ArticleBlock({ block }: Props) {
	return (
		<>
			<section className="section description">
				{ block.content }
			</section>
			{ block.slides?.length && (
				<section className="section slider">
					<ArticleSlider slides={ block.slides } />
				</section>
			) }

		</>
	);
}
