import type { ArticleSection as IArticleSection } from '@/components/visitor/Article/Article.types';
import parse from 'html-react-parser';
import ArticleSlider from '@/components/visitor/Article/ArticleSlider';
import { htmlParserOptions } from '@/variables/htmlParserOptions';

interface Props {
	section: IArticleSection;
}

export default function ArticleSection({ section }: Props) {
	return (
		<>
			<section className="section description">
				{ parse(section.content, htmlParserOptions) }
			</section>
			{ section.slides?.length !== 0 && (
				<section className="section slider">
					<ArticleSlider slides={ section.slides || [] } />
				</section>
			) }
		</>
	);
}
