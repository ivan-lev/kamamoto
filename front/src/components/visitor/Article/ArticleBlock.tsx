import type { IArticleBlock } from '@/components/visitor/Article/Article.types';
import parse from 'html-react-parser';
import ArticleSlider from '@/components/visitor/Article/ArticleSlider';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	block: IArticleBlock;
}

export default function ArticleBlock({ block }: Props) {
	return (
		<>
			<section className="section description">
				{ parse(block.content, htmlParserOptions) }
			</section>
			{ block.slides?.length && (
				<section className="section slider">
					<ArticleSlider slides={ block.slides } />
				</section>
			) }

		</>
	);
}
