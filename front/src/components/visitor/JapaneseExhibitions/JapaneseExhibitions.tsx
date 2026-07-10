import { useLayoutEffect } from 'react';
import PageTop from '@/components/visitor/PageTop/PageTop';
import Seo from '@/components/visitor/Seo/Seo';
import TermsList from '@/components/visitor/TermsList/TermsList';
import { scrollToTop } from '@/utils/scrollToTop';
import { japaneseExhibitions } from '@/variables/useful/japaneseExhibitions';

export default function JapaneseExhibitions() {
	useLayoutEffect(() => scrollToTop(), []);

	return (
		<>
			<Seo
				title="Камамото: японские выставки"
				description="Страница со списком выставок гончарного и прикладного искусства, проходящих в Японии"
			/>

			<PageTop
				title="Японские керамические выставки"
				subtitle="На этой странице будет собрана информация о выставках гончарного и прикладного искусства, проходящих в Японии. Информация находится в процессе заполнения."
				backLink="/useful/"
			/>

			<section className="section">
				<TermsList items={ japaneseExhibitions } />
			</section>
		</>
	);
}
