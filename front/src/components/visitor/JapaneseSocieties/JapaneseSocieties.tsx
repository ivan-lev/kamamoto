import parse from 'html-react-parser';
import { useLayoutEffect } from 'react';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import { scrollToTop } from '@/utils/scrollToTop';
import { htmlParserOptions } from '@/variables/htmlParserOptions';
import { japaneseSocieties } from '@/variables/useful/japaneseSocieties';

export default function JapaneseSocieties() {
	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo
				title="Камамото: японские керамические сообщества"
				description="Страница со списком сообществ, поддерживающих керамическую культуру и традиции Японии"
			/>

			<PageTop
				title="Японские керамические собщества"
				subtitle="На этой странице будет собрана информация о сообществах, поддерживающих развитие гончарного искусства Японии. Информация находится в процессе заполнения."
				backLink="/useful/"
			/>

			<section className="section">
				<div className="japanese-exhibitions">
					{ japaneseSocieties.map((item) => {
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
