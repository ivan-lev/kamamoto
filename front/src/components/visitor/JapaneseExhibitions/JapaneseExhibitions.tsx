import parse from 'html-react-parser';
import { useLayoutEffect } from 'react';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import { japaneseExhibitions } from '@/variables/japaneseExhibitions';

export default function JapaneseExhibitions() {
	useLayoutEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, []);

	return (
		<>
			<Seo title="Камамото: японские выставки" description="Страница со списком выставок гончарного и прикладного искусства, проходящих в Японии" />

			<PageTop title="Глоссарий" subtitle="На этой странице будет собрана информация о выставках гончарного и прикладного искусства, проходящих в Японии" />

			<section className="section dictionary">
				<div className="dictionary__list">
					{ japaneseExhibitions.map((item) => {
						return (
							<div className="dictionary__row" key={ item.title }>
								<div className="dictionary__cell dictionary__cell--span-3 dictionary__cell--title">
									{ parse(item.title, htmlParserOptions) }
								</div>
								<span className="dictionary__cell dictionary__cell--span-2 dictionary__cell--kanji">{ item.kanji }</span>
								<div className="dictionary__cell dictionary__cell--span-7 dictionary__cell--definition">
									{ parse(item.description, htmlParserOptions) }
								</div>
							</div>
						);
					}) }
				</div>
			</section>
		</>
	);
}
