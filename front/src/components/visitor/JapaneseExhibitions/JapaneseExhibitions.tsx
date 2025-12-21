import parse from 'html-react-parser';
import { useLayoutEffect } from 'react';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import { japaneseExhibitions } from '@/variables/useful/japaneseExhibitions';
import './JapaneseExhibitions.scss';

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

			<PageTop title="Японские керамические выставки" subtitle="На этой странице будет собрана информация о выставках гончарного и прикладного искусства, проходящих в Японии. Информация находится в процессе заполнения." />

			<section className="section">
				<div className="japanese-exhibitions">
					{ japaneseExhibitions.map((item) => {
						return (
							<div className="japanese-exhibitions__item" key={ item.title }>
								<div className="japanese-exhibitions__title">{ parse(item.title, htmlParserOptions) }</div>
								<span className="japanese-exhibitions__japanese-title">{ item.kanji }</span>
								{ item.image && <img src={ item.image } className="japanese-exhibitions__image" /> }

								<div className="japanese-exhibitions__description">
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
